import React, { Component } from "react";
import "./App.css";
import { Posts, WithPolling } from "./components";
import { PostsService } from "./services";

class App extends Component {

  constructor(props) {
    super(props)
    this.PostsWithPolling = WithPolling(Posts, PostsService.getPosts, {
      interval: 3000
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-content">
            <this.PostsWithPolling {...this.props} />
          </div>
        </header>
      </div>
    );
  }
}

export default App;
