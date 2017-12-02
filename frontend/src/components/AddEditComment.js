import React, { Component } from 'react'
import { connect } from 'react-redux'
import { receiveComments } from '../actions/comments'
import { objToArray } from '../utils/ObjectToArray'
import * as BackendAPI from '../utils/BackendAPI'
import * as PostHelpers from '../utils/PostHelpers'

class AddEditComment extends Component {
  state = {
    body: '',
    author: '',
    update: false
  }

  notValidInput() {
    const state = this.state
    if (state.body.length < 3)
      return "Body must be at least 3 characters long."
    else if (state.author.length < 3)
      return "Author must be at least 3 characters long"
    else
      return false
  }

  handleNewComment(event) {
    event.preventDefault()
    if (this.notValidInput()) {
      alert(this.notValidInput())
      return null
    }
    const commentParams = {
      ...this.state,
      timestamp: Date.now(),
      id: PostHelpers.generateUUID(),
      voteScore: 1,
      parentId: this.props.postID
    }
    BackendAPI.addComment(commentParams)
    const comments = {...this.props.comments, [commentParams.id]: commentParams}
    this.props.dispatch(receiveComments(comments))
    this.setState({body: '', author: ''})
  }

  handleUpdateComment(event) {
    event.preventDefault()
    if (this.notValidInput()) {
      alert(this.notValidInput())
      return null
    }
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
    this.props.dispatch(receiveComments({...comments}))
  }

  handleBodyChange(e) {
    this.setState({body: e.target.value})
  }

  handleAuthorChange(e) {
    this.setState({author: e.target.value})
  }

  componentDidMount() {
    if (this.props.currentComment) {
      this.setState({
        body: this.props.currentComment.body,
        author: this.props.currentComment.author,
        update: true
      })
    }
  }

  render() {
    return(
      <div className="row">
        <form
          className={this.state.update ? "comment-update-container" : "comment-form-container"}
          onSubmit={this.state.update ? (e) => this.handleUpdateComment(e) : (e) => this.handleNewComment(e)}>
          <div>
            <label>
              Comment <br/>
              <textarea
                className={this.state.update ? "comment-update-body" : "comment-form-body"}
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
              <button type="submit" className="btn btn-success">Submit Comment</button>
            </div>
          }
          {this.state.update &&
            <div className="update-comment-button">
                <button type="submit" className="btn btn-success">Update Comment</button>
            </div>
          }
        </form>
      </div>
    )
  }
}

function mapStateToProps({comments}) {
  return { comments }
}

export default connect(mapStateToProps)(AddEditComment)
