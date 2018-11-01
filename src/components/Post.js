import React, { Component } from "react";
import "./Post.css";

class Post extends Component {
  render() {
    return (
      <div className={"Post"}>
        <h1>{this.props.id}</h1>
        <h3>{this.props.title}</h3>
        <p>{this.props.body}</p>
      </div>
    );
  }
}

export default Post;
