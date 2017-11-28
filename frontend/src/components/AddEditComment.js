import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getComments } from '../actions'
import * as BackendAPI from '../utils/BackendAPI'
import * as PostHelpers from '../utils/PostHelpers'

class AddEditComment extends Component {
  state = {
    body: '',
    author: '',
  }

  handleComment(event) {
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

  handleBodyChange(e) {
    this.setState({body: e.target.value})
  }

  handleAuthorChange(e) {
    this.setState({author: e.target.value})
  }

  render() {
    return(
      <div className="row">
        <form
          className="comment-form-container"
          onSubmit={(event) => this.handleComment(event)}>
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
