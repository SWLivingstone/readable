import React, { Component } from 'react'
import { connect } from 'react-redux'
import EditPostButton from './EditPostButton'
import Vote from './Vote'
import Comment from './Comment'
import { getComments } from '../actions'
import * as BackendAPI from '../utils/BackendAPI'
import * as PostHelpers from '../utils/PostHelpers'

class PostView extends Component {

  componentDidMount() {
    BackendAPI.getComments(this.props.post.id)
      .then(comments => this.props.dispatch( getComments(comments) ))
  }

  render () {
    const post = this.props.post
    return(
      <div className="container">
        <div className="row post-detail-container">
          <h4 className="post-title" >{post.title}</h4>
          <div className="col-sm-10 post-body">
            <p >{post.body}</p>
          </div>
          <div className="col-sm-2">
            <Vote postID={post.id} type="post"/>
            <EditPostButton post={post}/>
            <div >
              <small>posted by: {post.author}</small><br/>
              <small>in {post.category}</small><br/>
              <small>{PostHelpers.getTimePassed(post.timestamp)} ago</small>
            </div>
          </div>
        </div>
        <h4 className="comment-header" >Comments</h4>
        {this.props.comments && this.props.comments.map(comment => (
          <Comment key={`comment-${comment.id}`} comment={comment}/>
        ))}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts.posts,
    comments: state.comments.comments
  }
}

export default connect(mapStateToProps)(PostView)
