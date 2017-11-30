import React from 'react'
import { connect } from 'react-redux'
import { objToArray } from '../utils/ObjectToArray'
import { getPosts } from '../actions'
import { withRouter } from 'react-router-dom'
import { deletePost } from '../utils/BackendAPI'
import RaisedButton from 'material-ui/RaisedButton'
import Delete from 'material-ui/svg-icons/action/delete-forever'

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
      <RaisedButton
        label="Delete Post"
        icon={<Delete/>}
        onClick={(e) => {if(window.confirm('Delete this post?')) {handleClick(e)};}}
      />
    </div>
  )
}

function mapStateToProps({posts}) {
  return { ...posts }
}

export default connect(mapStateToProps)(withRouter(DeletePostButton))
