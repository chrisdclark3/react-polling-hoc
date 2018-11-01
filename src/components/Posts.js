import React, { Component } from "react";
import Post from "./Post";
import "./Posts.css";

class Posts extends Component {
  get posts() {
    let startIndex = Math.floor(Math.random() * 90);
    let endIndex = startIndex + 10;
    return this.props.data.slice(startIndex, endIndex);
  }
  render() {
    return (
      <div className={"Posts"}>
        <h1 className={"Posts-title"}>Posts</h1>
        <div className={"Posts-body"}>
          {this.posts.map(post => {
            return <Post {...post} key={post.id} />;
          })}
        </div>
      </div>
    );
  }
}

export default Posts;
