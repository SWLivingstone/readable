import React from 'react'
import { connect } from 'react-redux'
import * as Posts from '../actions/posts'
import * as Comments from '../actions/comments'
import { objToArray } from '../utils/ObjectToArray'

const Vote = props => {
  const type = props.type
  const voteScore = objToArray(props[`${type}s`]).filter(obj => obj.id === props[`${type}ID`]).shift().voteScore
  const Actions = {...Posts, ...Comments}

  const handleVote = vote => {
    const type = props.type
    const newState = objToArray(props[`${type}s`]).map(obj => {
      if (obj.id === props[`${type}ID`]) {
        obj.voteScore = vote === "upVote" ? obj.voteScore + 1 : obj.voteScore - 1
      }
      return obj
    })
    const call = typeToActionCall(type)
    props.dispatch(Actions[`${call}`](vote, props[`${type}ID`], newState))
  }

  const typeToActionCall = type => {
    type = type.charAt(0).toUpperCase() + type.slice(1);
    console.log(type)
    return `vote${type}s`
  }

  return(
    <div className="vote-container">
      <div className="up-down-vote-container">
        <button type="button" className="btn btn-default up-vote" onClick={() => handleVote("upVote")}>
          <span className="glyphicon glyphicon-chevron-up" aria-hidden="true"></span>
        </button>
          <p className="current-vote-count">{voteScore}</p>
        <button type="button" className="btn btn-default up-vote" onClick={() => handleVote("downVote")}>
          <span className="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>
        </button>
      </div>
    </div>
  )
}

function mapStateToProps({posts, comments}) {
  return { ...posts, comments }
}

export default connect(mapStateToProps)(Vote)
