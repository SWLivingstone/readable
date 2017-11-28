import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPosts } from '../actions'
import { Redirect } from 'react-router-dom'
import { objToArray } from '../utils/ObjectToArray'
import * as BackendAPI from '../utils/BackendAPI'
import * as PostHelpers from '../utils/PostHelpers'

class AddEditPost extends Component {
  state = {
    title: '',
    body: '',
    author: '',
    category: '',
    id: '',
    fireRedirect: false,
    update: false
  }

  notValidInput() {
    const state = this.state
    if (state.title.length > 2 &&
      state.body.length > 10 &&
      state.author.length > 2 &&
      state.category)
      return false
    else
      return true
  }

  handleNewPost(event) {
    event.preventDefault()
    if (this.notValidInput()) {
      alert("Must have Author, Title, Body, and Category to create post")
      return null
    }
    const id = PostHelpers.generateUUID()
    const postParams = {
      ...this.state,
      timestamp: Date.now(),
      id: id,
      voteScore: 1
    }
    BackendAPI.addPost(postParams)
    const posts = {...this.props.posts, [postParams.id]: postParams}
    this.props.dispatch(getPosts(posts))
    alert("Post Successful!")
    this.setState({fireRedirect: true, id: id})
  }

  handleUpdate(event) {
    event.preventDefault()
    if (this.notValidInput()) {
      alert("Post Title or Body is too short!")
      return null
    }
    const postParams = {
      title: this.state.title,
      body: this.state.body
    }
    BackendAPI.updatePost(this.state.id, postParams)
    const posts = objToArray(this.props.posts).map(post => {
      if (post.id === this.state.id) {
        post.title = this.state.title
        post.body = this.state.body
      }
      return post
    })
    this.props.dispatch(getPosts({...posts}))
    alert("Post Updated!")
    this.setState({fireRedirect: true})
  }

  handleTitleChange(e) {
    this.setState({title: e.target.value})
  }

  handleBodyChange(e) {
    this.setState({body: e.target.value})
  }

  handleAuthorChange(e) {
    this.setState({author: e.target.value})
  }

  handleCategorySelect(e) {
    this.setState({category: e.target.value})
  }

  componentDidMount() {
    if (this.props.location.state) {
      const post = this.props.location.state.post
      this.setState({
        title: post.title,
        body: post.body,
        author: post.author,
        category: post.category,
        id: post.id,
        update: true
      })
    }
  }

  render() {
    return(
      <div>
        {this.state.fireRedirect && (<Redirect to={`/post-${this.state.id}`} />)}
        <h3>Create Post</h3>
        <form className="create-post-form"
          onSubmit={this.state.update ? (e) => this.handleUpdate(e) : (e) => this.handleNewPost(e)}>
          <label>
            Title:
            <input type="text"
              name="title"
              placeholder="Something catchy!"
              value={this.state.title}
              onChange={(e) => this.handleTitleChange(e)}
            />
          </label>
          <label>
            Body:
            <textarea type="text"
              name="body"
              className="form-body"
              placeholder="So many clever and witty things!"
              value={this.state.body}
              onChange={(e) => this.handleBodyChange(e)}
            />
          </label>
          { this.state.update === false && (
            <div>
              <label>
                Author:
                <input type="text"
                  name="author"
                  placeholder="Your name!"
                  value={this.state.author}
                  onChange={(e) => this.handleAuthorChange(e)}
                />
              </label>
              <label>
                Choose Category:
                <select value={this.state.category} onChange={(e) => this.handleCategorySelect(e)}>
                  <option value="Select"></option>
                  {this.props.categories && objToArray(this.props.categories).map(category => (
                    <option key={`${category.name}-select`} value={category.name}>{category.name}</option>
                  ))}
                </select>
              </label>
            </div>
          )}
          <input type="submit" value="Submit"/>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    categories: state.posts.categories,
    posts: state.posts.posts
  }
}

export default connect(mapStateToProps)(AddEditPost)
