import React from 'react'
import { connect } from 'react-redux'
import { objToArray } from '../utils/ObjectToArray'
import { getPosts } from '../actions'
import { withRouter } from 'react-router-dom'
import { deletePost } from '../utils/BackendAPI'

const DeletePostButton = props => {

  const handleClick = (event) => {
    event.preventDefault()
    deletePost(props.post.id)
    const posts = objToArray(props.posts).filter(post => post.id !== props.post.id)
    props.dispatch(getPosts(posts))
    props.history.push('/')
  }

  return (
    <div className="delete-post-button">
      <a
        onClick={(e) => {if(window.confirm('Delete this post?')) {handleClick(e)};}}
        >Delete Post
      </a>
    </div>
  )
}

function mapStateToProps({posts}) {
  return { ...posts }
}

export default connect(mapStateToProps)(withRouter(DeletePostButton))
