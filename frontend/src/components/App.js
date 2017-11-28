import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import * as BackendAPI from '../utils/BackendAPI'
import { objToArray } from '../utils/ObjectToArray'
import '../App.css'
import Header from './Header'
import SelectCategory from './SelectCategory'
import PostIndex from './PostIndex'
import AddEditPost from './AddEditPost'
import PostView from './PostView'
import { getPosts, getCategories } from '../actions'

class App extends Component {

  componentDidMount() {
    this.updatePosts()
    this.updateCategories()
  }

  updatePosts() {
    BackendAPI.getAllPosts()
      .then(posts => this.props.dispatch(getPosts(posts)))
  }

  updateCategories() {
    BackendAPI.getCategories()
      .then(categories => this.props.dispatch(getCategories(categories)))
  }


  render() {
    return (
      <div className="App container">
        <div>
          <Header/>
          <SelectCategory/>
        </div>
        <Switch>
          <Route exact path='/' render={() => (
            <div>
              <PostIndex filter='all'/>
            </div>
          )}/>
          {this.props.categories && objToArray(this.props.categories).map(category => (
            <Route key={`${category.name}-index`} path={`/${category.name}-index`} render={() => (
              <div>
                <PostIndex filter={category.name}/>
              </div>
            )}/>
          ))}
          <Route path='/add-post/' component={AddEditPost}/>
          {this.props.posts && objToArray(this.props.posts).map(post => (
            <Route key={`detailed-${post.id}`} path={`/post-${post.id}`} render ={() => (
              <div>
                <PostView post={post}/>
              </div>
            )}/>
          ))}
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.posts.categories,
    posts: state.posts.posts
  }
}

export default connect(mapStateToProps)(App)
