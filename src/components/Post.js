import React, { Component } from "react";
import "./Post.css";

class Post extends Component {
  render() {
    return (
      <div className={"Post"}>
        <h1 className={"Post-id"}>{this.props.id}</h1>
        <h3 className={"Post-title"}>{this.props.title}</h3>
        <p className={"Post-body"}>{this.props.body}</p>
      </div>
    );
  }
}

export default Post;
