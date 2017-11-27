import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPosts } from '../actions'
import * as BackendAPI from '../BackendAPI'

class PostVote extends Component {
  state = {
    voteScore: null
  }

  handleVote(vote) {
    BackendAPI.postVote(vote, this.props.postID)
    this.props.posts.map(post => {
      if (post.id === this.props.postID) {
        post.voteScore = vote === "upVote" ? post.voteScore + 1 : post.voteScore - 1
      }
      return post
    })
    this.props.dispatch(getPosts(this.props.posts))
    this.setState({
      voteScore: this.props.posts.filter(post => post.id === this.props.postID).shift().voteScore
    })
  }

  componentDidMount() {
    this.setState({
      voteScore: this.props.posts.filter(post => post.id === this.props.postID).shift().voteScore
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
    posts: state.posts
  }
}

export default connect(mapStateToProps)(PostVote)
