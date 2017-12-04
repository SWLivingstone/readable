import React, { Component } from 'react'
import Vote from './Vote'
import { Collapse } from 'react-collapse'
import { connect } from 'react-redux'
import { objToArray } from '../utils/ObjectToArray'
import { deleteComment } from '../actions/comments'
import AddEditComment from './AddEditComment'
import * as PostHelpers from '../utils/PostHelpers'
import Paper from 'material-ui/Paper'

class Comment extends Component {
  state = {
    isOpened: false
  }

  handleCollapse() {
    const newState = this.state.isOpened ? false : true
    this.setState({isOpened: newState})
  }

  handleDeleteComment() {
    const commentID = this.props.comment.id
    const comments = objToArray(this.props.comments).filter(comment => comment.id !== commentID)
    this.props.dispatch(deleteComment(commentID, comments))
  }

  componentWillReceiveProps(nextProps) {
    this.setState({isOpened: false})
  }

  render() {
    return(
      <Paper className="row comment-container" zDepth={1}>
        <div className="col-sm-8">
          <p className="comment-body">{this.props.comment.body}</p>
          <Collapse isOpened={this.state.isOpened}>
            <AddEditComment
              currentComment={this.props.comment}/>
          </Collapse>
        </div>
        <div className="col-sm-3">
          <p className="comment-author">
            {this.props.comment.author}
            <br/>
            {PostHelpers.getTimePassed(this.props.comment.timestamp)} ago
          </p>
          <div className="comment-button-container">
            <button
              type="button"
              className="btn btn-warning btn-sm edit-comment-button"
              onClick={() => this.handleCollapse()}
              >{this.state.isOpened ? "Cancel Edit" : "Edit Comment"}
            </button>
            <button
              type="button"
              className="btn btn-danger btn-sm delete-comment-button"
              onClick={() => this.handleDeleteComment()}
              >Delete comment
            </button>
          </div>
        </div>
        <div className="col-sm-1">
          <Vote commentID={this.props.comment.id} type="comment"/>
        </div>
      </Paper>
    )
  }
}

function mapStateToProps({comments}) {
  return { comments }
}

export default connect(mapStateToProps)(Comment)
