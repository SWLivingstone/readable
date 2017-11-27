import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPosts, getComments } from '../actions'
import * as BackendAPI from '../utils/BackendAPI'

class Vote extends Component {
  state = {
    voteScore: null
  }

  handleVote(vote) {
    let type = this.props.type
    BackendAPI[`${type}Vote`](vote, this.props[`${type}ID`])
    this.props[`${type}s`].map(obj => {
      if (obj.id === this.props[`${type}ID`]) {
        obj.voteScore = vote === "upVote" ? obj.voteScore + 1 : obj.voteScore - 1
      }
      return obj
    })
    type === "post" ?
    this.props.dispatch(getPosts(this.props.posts)) :
    this.props.dispatch(getComments(this.props.comments))
    this.updateVote()
  }

  componentDidMount() {
    this.updateVote()
  }

  updateVote() {
    const type = this.props.type
    this.setState({
      voteScore: this.props[`${type}s`].filter(obj => obj.id === this.props[`${type}ID`]).shift().voteScore
    })
  }

  render () {
    return(
      <div className="vote-container">
        <div className="up-down-vote-container">
          <button type="button" className="btn btn-default up-vote" onClick={() => this.handleVote("upVote")}>
            <span className="glyphicon glyphicon-chevron-up" aria-hidden="true"></span>
          </button>
            <p className="current-vote-count">{this.state.voteScore}</p>
          <button type="button" className="btn btn-default up-vote" onClick={() => this.handleVote("downVote")}>
            <span className="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>
          </button>
        </div>
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

export default connect(mapStateToProps)(Vote)
