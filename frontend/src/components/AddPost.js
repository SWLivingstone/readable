import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPosts } from '../actions'
import { Redirect } from 'react-router-dom'
import * as BackendAPI from '../BackendAPI'

class AddPost extends Component {
  state = {
    title: '',
    body: '',
    author: '',
    category: '',
    id: '',
    fireRedirect: false,
    update: false
  }
  // Got this UUID generator from https://jsfiddle.net/briguy37/2MVFd/
  generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};

  handleNewPost(event) {
    event.preventDefault()
    const postParams = {
      ...this.state,
      timestamp: Date.now(),
      id: this.generateUUID(),
      voteScore: 1
    }
    BackendAPI.addPost(postParams)
    this.props.posts.push(postParams)
    this.props.dispatch(getPosts(this.props.posts))
    alert("Post Successful!")
    this.setState({fireRedirect: true})
  }

  handleUpdate(event) {
    event.preventDefault()
    const postParams = {
      title: this.state.title,
      body: this.state.body
    }
    BackendAPI.updatePost(this.state.id, postParams)
    this.props.posts.map(post => {
      if (post.id === this.state.id) {
        post.title = this.state.title
        post.body = this.state.body
      }
      return post
    })
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
        {this.state.fireRedirect && (<Redirect to={`/${this.state.category}-index`} />)}
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
                  {this.props.categories && this.props.categories.map(category => (
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
    categories: state.categories,
    posts: state.posts
  }
}

export default connect(mapStateToProps)(AddPost)