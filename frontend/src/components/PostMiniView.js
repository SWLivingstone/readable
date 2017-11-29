import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Vote from './Vote'
import * as PostHelpers from '../utils/PostHelpers'
import * as BackendAPI from '../utils/BackendAPI'

class PostMiniView extends Component {
  state = {
    commentCount: 0
  }

  componentDidMount() {
    BackendAPI.getComments(this.props.post.id)
      .then((comments) => this.setState({commentCount: comments.length}))
  }

  render() {
    const post = this.props.post
    const commentCount = this.state.commentCount
    return(
      <div className="row post-preview">
        <h4>
          <Link to={`/${post.category}/${post.id}`} >{post.title}</Link>
          <br/>
          <small>{commentCount} {commentCount === 1 ? "comment" : "comments"}</small>
        </h4>
        <p className="post-preview-body" >
          {post.body.substr(0,200)}
          <Link to={`/post-${post.id}`} > ...more</Link>
        </p>
        <Vote postID={post.id} type="post"/>
        <div className="post-info-container">
          <small>posted by: {post.author}</small><br/>
          <small>in {post.category}</small><br/>
          <small>{PostHelpers.getTimePassed(post.timestamp)} ago</small>
        </div>
      </div>
    )
  }
}

export default PostMiniView
