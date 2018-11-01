import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Posts from "./Posts";
import PostsService from "./services/PostsService";
import WithPolling from "./WithPolling";
console.log("PostsService", PostsService);

class App extends Component {
  PostsWithPolling = WithPolling(Posts, PostsService.getPosts, {
    interval: 3000
  });

  render() {
    console.log("App render > this", this);
    var PostsWithPolling = this.PostsWithPolling;
    return (
      <div className="App">
        <header className="App-header">
          <h1>With Polling</h1>
          <div className="App-content">
            <PostsWithPolling {...this.props} />
          </div>
        </header>
      </div>
    );
  }
}

export default App;
