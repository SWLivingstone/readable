import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class AddPostButton extends Component {
  render() {
    return(
      <div className="add-post-button">
        <Link
          to="/add-post"
          >Search Books
        </Link>
      </div>
    )
  }
}

export default AddPostButton
