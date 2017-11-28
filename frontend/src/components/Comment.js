import React from 'react'
import Vote from './Vote'
import * as PostHelpers from '../utils/PostHelpers'

const Comment = props => (
  <div className="row comment-container">
    <div className="col-sm-8">
      <p className="comment-body">{props.comment.body}</p>
    </div>
    <div className="col-sm-3">
      <p className="comment-author">
        {props.comment.author}
        <br/>
        {PostHelpers.getTimePassed(props.comment.timestamp)} ago
      </p>
    </div>
    <div className="col-sm-1">
      <Vote commentID={props.comment.id} type="comment"/>
    </div>
  </div>
)

export default Comment
