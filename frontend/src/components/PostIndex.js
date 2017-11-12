import React, { Component } from 'react'
import { connect } from 'react-redux'

class PostIndex extends Component {

  render () {
    return(
      <div className="container post-index">
        {this.props.posts && this.props.posts.map(post => (
          <div className="row post-preview" key={post.id}>
            <h4>{post.title}</h4>
            <small>posted by: {post.author}</small><br/>
            <small>in {post.category}</small><br/>
            <small>at {post.timestamp}</small>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts
  }
}

export default connect(mapStateToProps)(PostIndex)
