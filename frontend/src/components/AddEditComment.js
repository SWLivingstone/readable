import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getComments } from '../actions'
import { objToArray } from '../utils/ObjectToArray'
import * as BackendAPI from '../utils/BackendAPI'
import * as PostHelpers from '../utils/PostHelpers'

class AddEditComment extends Component {
  state = {
    body: '',
    author: '',
    update: false
  }

  handleNewComment(event) {
    event.preventDefault()
    const commentParams = {
      ...this.state,
      timestamp: Date.now(),
      id: PostHelpers.generateUUID(),
      voteScore: 1,
      parentId: this.props.postID
    }
    BackendAPI.addComment(commentParams)
    const comments = {...this.props.comments, [commentParams.id]: commentParams}
    this.props.dispatch(getComments(comments))
  }

  handleUpdateComment(event) {
    event.preventDefault()
    const commentParams = {
      timestamp: Date.now(),
      body: this.state.body
    }
    BackendAPI.updateComment(this.props.currentComment.id, commentParams)
    const comments = objToArray(this.props.comments).map(comment => {
      if (comment.id === this.props.currentComment.id) {
        comment.body = this.state.body
        comment.timestamp = commentParams.timestamp
      }
      return comment
    })
    this.props.dispatch(getComments({...comments}))
  }

  handleBodyChange(e) {
    this.setState({body: e.target.value})
  }

  handleAuthorChange(e) {
    this.setState({author: e.target.value})
  }

  componentDidMount() {
    if (this.props.currentComment) {
      console.log("fired")
      this.setState({
        body: this.props.currentComment.body,
        update: true
      })
    }
  }

  render() {
    return(
      <div className="row">
        <form
          className="comment-form-container"
          onSubmit={this.state.update ? (e) => this.handleUpdateComment(e) : (e) => this.handleNewComment(e)}>
          <div>
            <label>
              Comment <br/>
              <textarea
                rows="5" cols="50"
                className="comment-form-body"
                placeholder="Many nice things to say..."
                onChange={(e) => this.handleBodyChange(e)}
                value={this.state.body}/>
            </label>
          </div>
          {this.state.update === false &&
            <div>
              <label>
                Your Name <br/>
                <input
                  placeholder="Han Solo"
                  onChange={(e) => this.handleAuthorChange(e)}
                  value={this.state.author}/>
              </label> <br />
              <input type="submit" value="Submit Comment"/>
            </div>
          }
          {this.state.update &&
            <div>
              <input type="submit" value="Update Comment"/>
            </div>
          }
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    comments: state.comments
  }
}

export default connect(mapStateToProps)(AddEditComment)
