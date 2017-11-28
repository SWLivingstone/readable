import React, { Component } from 'react'
import Vote from './Vote'
import { Collapse } from 'react-collapse'
import AddEditComment from './AddEditComment'
import * as PostHelpers from '../utils/PostHelpers'

class Comment extends Component {
  state = {
    isOpened: false
  }

  handleCollapse() {
    const newState = this.state.isOpened ? false : true
    this.setState({isOpened: newState})
  }

  componentWillReceiveProps(nextProps) {
    this.setState({isOpened: false})
  }

  render() {
    return(
      <div className="row comment-container">
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
          <button onClick={() => this.handleCollapse()}>
            {this.state.isOpened ? "Cancel Edit" : "Edit Comment"}
          </button>
        </div>
        <div className="col-sm-1">
          <Vote commentID={this.props.comment.id} type="comment"/>
        </div>
      </div>
    )
  }
}


export default Comment
