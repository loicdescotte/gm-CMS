import React, { Component } from 'react';
import { Grid, Navbar, Jumbotron } from 'react-bootstrap';
import { Link } from 'react-router';
import RawHtml from "react-raw-html";
import './App.css';


class Post extends React.Component {
  render() {
    return (
      <RawHtml.div>
        {this.props.currentPost}
      </RawHtml.div>
    );
  }
}


class List extends React.Component {
  constructor(props) {
    super(props);
    const posts = [];
    this.state = {
      search: '',
      newItem: '',
      posts: posts,
      currentPost: '',
      displayList : true
    };
  }

  componentDidMount() {
    fetch("http://localhost:4000/posts")
      .then(result=> {
        result.json().then( jsonResult => {
          const posts = jsonResult.posts.map(fileName => {
            const fileNameParts = fileName.split(".");
            fileNameParts.pop(); // remove extension
            const title = fileNameParts.join(".");
            let titleParts = title.split("-");
            // remove date
            const date = `${titleParts[0]}-${titleParts[1]}-${titleParts[2]}`;
            titleParts = titleParts.slice(0);
            titleParts = titleParts.slice(1);
            titleParts = titleParts.slice(2);
            const label = `${date}: ${titleParts.join(" ")}`;
            return {label: this.toTitleCase(label),fileName: fileName};
          });
          this.setState( {posts: posts} );
        })
       })
      .catch(error => console.log(error));
  }

  toTitleCase(str){
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }

  handleSearchChange(e) {
    this.setState({search: e.target.value});
  }

  loadPost(fileName){
    fetch("http://localhost:4000/post/"+fileName).then(result => {
      result.text().then(body => {
        this.setState({
          currentPost: body,
          displayList: false
        });
      });
    });
  }

  handleBackClick(fileName){
    this.setState({displayList: true});
  }

  addNewItem(item) {
    var newNames = this.state.posts;
    newNames.push(item);
    this.setState({posts: newNames});
  }

  render() {
    const listItems = this.state.posts
      .filter(post => {
        return post.label.toLowerCase().includes(this.state.search.toLowerCase());
      })
      .map(post => (
        <li>
          <Link to={"/post/"+post.fileName} onClick={(e) => this.loadPost(post.fileName)}>{post.label}</Link>
        </li>)
      );
      const search = this.state.search;
      let postLists;
      if(this.state.displayList) postLists = (
          <div>
            <span>Search : </span>
            <input type="text" value={search} onChange={(e) =>  this.handleSearchChange(e)}/>
            <h3>Published posts : </h3>
            <ul>{listItems}</ul>
          </div>
      );
      else postLists = <Link to="/" onClick={(e) => this.handleBackClick()}>Back to post lists</Link>;
      let currentPost;
      if(this.state.displayList) currentPost = <div/>;
      else {
        currentPost = <Post currentPost={this.state.currentPost}/>
      }
      return (
      <div>
        {postLists}
        {currentPost}
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <Navbar inverse fixedTop>
          <Grid>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">Home</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
          </Grid>
        </Navbar>
        <Jumbotron>
          <Grid>
            <h1>GM-CMS</h1>
            <br/>
            <div>
              <List/>
            </div>
            <p>
            </p>
          </Grid>
        </Jumbotron>
      </div>
    );
  }
}

export default App;
