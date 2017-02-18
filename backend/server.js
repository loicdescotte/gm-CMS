const express = require('express'),
 http = require('http'),
 path = require('path'),
 bodyParser = require('body-parser'),
 fs = require('mz/fs'),
 markdown = require( "markdown" ).markdown,
 app = express(),
 nodegit = require('nodegit'),
 program = require('commander');

let postDir = "_posts/",
 localRepo = "./repo/",
 defaultRepo = "https://github.com/loicdescotte/CMS-Content-Test.git";

app.set('port', process.env.PORT || 4000);

program
  .option('-r, --repository [repo]', 'git content repository', defaultRepo)
  .parse(process.argv);

//init repo
if(!fs.existsSync(localRepo)) {
  nodegit.Clone( program.repository, localRepo, {})
    .then(repo => console.log("Cloned " + path.basename(program.repository) + " to " + repo.workdir()))
    .catch(err => console.log(err));
}

function openRepo(){
  const repo = nodegit.Repository.open(localRepo);
  return repo
    .then(repo => {
      repo.fetchAll();
      return repo;
    })
    .then((repo) => {
      repo.mergeBranches("master", "origin/master");
      return repo;
    })
    .catch(err => console.log(err));
}

function getContent(repo, fileName, revision){
  let commit;
  if (revision) commit = repo.getCommit(revision);
  else commit = repo.getBranchCommit("HEAD");
  return commit
    .then(commit => commit.getEntry(fileName))
    .then(entry => entry.getBlob())
    .then(blob => String(blob))
    .catch(err => console.log(err));
}


//enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/// routes ///

//find all
app.get('/posts', (req, res) => {
  const posts = [];
  openRepo()
    .then(repo => fs.readdir(localRepo+postDir))
    .then(listing => {
      listing.filter(fileName => {
        if(! fileName.endsWith(".md")) return false;
        else {
          const fileNameSplit = fileName.split("-")
          const date = Date.parse(`${fileNameSplit[0]}-${fileNameSplit[1]}-${fileNameSplit[2]}`);
          return date <= Date.now();
        }
      })
      .forEach(fileName =>  posts.push(fileName));
      return posts;
    })
  .then(posts => {
    res.send(JSON.stringify({"posts":posts}));
  })
  .catch(err => {
    console.log(err);
    res.send(err);
  })
});

//read one post
//example : http://localhost:4000/post/2017-01-01-first-post.md
app.get('/post/:id', (req, res) => {
    openRepo()
    .then(repo => {
      if(req.query.commit) return getContent(repo, postDir+req.params.id, req.query.commit);
      else return getContent(repo, postDir+req.params.id);
    })
    .then(content => res.send(markdown.toHTML(content)))
    .catch(err => {
      console.log(err);
      res.send(err)
    });
});

http.createServer(app).listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'))
});

exports._test = {
    getContent: getContent
}
