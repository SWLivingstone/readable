import React from 'react'
import { Link } from 'react-router-dom'

const EditPostButton = props => (
  <div className="Edit-post-button">
    <Link
      to={{ pathname: '/add-post', state: { post: props.post } }}
      >Edit Post
    </Link>
  </div>
)


export default EditPostButton
