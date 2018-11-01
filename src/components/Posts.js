import React, { Component } from "react";
import Post from "./Post";
import "./Posts.css";

class Posts extends Component {
  get posts() {
    let startIndex = Math.floor(Math.random() * 90);
    let big = endIndex + 10;
    return this.props.data.slice(endIndex, big);
  }
  render() {
    return (
      <div className={"Posts"}>
        <h2>Posts</h2>
        <div className={"body"}>
          {this.posts.map(post => {
            return <Post {...post} key={post.id} />;
          })}
        </div>
      </div>
    );
  }
}

export default Posts;
