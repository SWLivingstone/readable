import React from 'react'
import { connect } from 'react-redux'
import { objToArray } from '../utils/ObjectToArray'
import { deletePost } from '../actions/posts'
import { withRouter } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import Delete from 'material-ui/svg-icons/action/delete-forever'

const DeletePostButton = props => {

  const handleClick = (event) => {
    event.preventDefault()
    const posts = objToArray(props.posts).filter(post => post.id !== props.post.id)
    props.dispatch(deletePost(props.post.id, posts))
    props.history.push('/')
  }

  return (
    <div>
      <RaisedButton
        className="delete-post-button"
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
