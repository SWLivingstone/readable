import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Vote from './Vote'
import * as PostHelpers from '../utils/PostHelpers'
import * as BackendAPI from '../utils/BackendAPI'
import Paper from 'material-ui/Paper'
import EditPostButton from './EditPostButton'
import DeletePostButton from './DeletePostButton'

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
      <Paper className="post-mini-paper" zDepth={3}>
        <div className="row post-preview">
          <h4>
            <Link to={`/${post.category}/${post.id}`}>{post.title}</Link>
            <br/>
            <small>{commentCount} {commentCount === 1 ? "comment" : "comments"}</small>
          </h4>
          <div className="row">
            <div className="col-sm-1 post-mini-view-vote">
              <Vote postID={post.id} type="post"/>
            </div>
            <div className="col-sm-11">
              <p className="post-preview-body">
                {post.body.substr(0,200)}
                <Link to={`/post-${post.id}`} > ...more</Link>
              </p>
            </div>
          </div>
          <div className="mini-view-button-container">
            <EditPostButton post={post}/>
            <DeletePostButton post={post}/>
          </div>
          <div className="post-info-container">
            <small>posted by: {post.author}</small><br/>
            <small>in {post.category}</small><br/>
            <small>{PostHelpers.getTimePassed(post.timestamp)} ago</small>
          </div>
        </div>
      </Paper>
    )
  }
}

export default PostMiniView
