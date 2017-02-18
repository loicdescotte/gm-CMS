//Run with 'mocha tests.js'

const should = require("should"),
  server = require("./server.js"),
  nodegit = require('nodegit'),
  assert = require('assert'),
  request = require('supertest'),
  http = require('http'),
  port = 4000;

describe('posts', function() {
  const url = "http://localhost:" + port.toString();
  it('retrieve posts', done => {
      request(url).get('/posts')
      .end( (err, res) => {
          res.text.includes('{"posts":[').should.be.exactly(true);
          done();
      });
  });
});

describe('post', function() {
  const url = "http://localhost:" + port.toString();
  it('retrieve post', done => {
      request(url).get('/post/2017-01-01-first-post.md')
      .end( (err, res) => {
          res.text.includes("first post").should.be.exactly(true);
          done();
      });
  });
});


describe("getContent", () => {
  it("should read from repo", function(){
      nodegit.Repository.open("./repo").then(repo => {
      server._test.getContent(repo, "2014-06-08-first.md").includes("Welcome").should.be.exactly(true);
    })
    .catch(err => {
      fail();
      console.log(err);
    });
  });
});
