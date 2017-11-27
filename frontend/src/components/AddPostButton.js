import React from 'react'
import { Link } from 'react-router-dom'

const AddPostButton = props => (
  <div className="add-post-button">
    <Link
      to="/add-post"
      >Add Post
    </Link>
  </div>
)


export default AddPostButton
