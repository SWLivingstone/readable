import React, { Component } from 'react'
import { connect } from 'react-redux'
import EditPostButton from './EditPostButton'
import DeletePostButton from './DeletePostButton'
import AddEditComment from './AddEditComment'
import Vote from './Vote'
import Comment from './Comment'
import { getComments } from '../actions'
import { objToArray } from '../utils/ObjectToArray'
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
          <div className="col-sm-9 post-body">
            <p >{post.body}</p>
          </div>
          <div className="col-sm-3">
            <Vote postID={post.id} type="post"/>
            <EditPostButton post={post}/>
            <DeletePostButton post={post}/>
            <div >
              <small>posted by: {post.author}</small><br/>
              <small>in {post.category}</small><br/>
              <small>{PostHelpers.getTimePassed(post.timestamp)} ago</small>
            </div>
          </div>
        </div>
        <AddEditComment postID={post.id}/>
        <h4 className="comment-header" >Comments</h4>
        {this.props.comments && objToArray(this.props.comments).reverse().map(comment => (
          <Comment key={`comment-${comment.id}`} comment={comment}/>
        ))}
      </div>
    )
  }
}

function mapStateToProps({comments}) {
  return { comments }
}

export default connect(mapStateToProps)(PostView)
