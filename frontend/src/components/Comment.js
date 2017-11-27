import React from 'react'
import Vote from './Vote'

const Comment = props => (
  <div className="row">
    <div className="col-sm-10">
      <p>{props.comment.body}</p>
    </div>
    <div className="col-sm-2">
      <Vote commentID={props.comment.id} type="comment"/>
    </div>
  </div>
)

export default Comment
