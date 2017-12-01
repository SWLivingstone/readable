import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { objToArray } from '../utils/ObjectToArray'
import '../App.css'
import Header from './Header'
import SelectCategory from './SelectCategory'
import PostIndex from './PostIndex'
import AddEditPost from './AddEditPost'
import PostView from './PostView'
import NoMatch from './NoMatch.js'
import { fetchPosts} from '../actions/posts'
import { fetchCategories } from '../actions/categories'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(fetchPosts())
    this.props.dispatch(fetchCategories())
  }

  render() {
    return (
      <div className="App container">
        <div>
          <Header/>
          <SelectCategory location={this.props.location}/>
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
            <Route key={`detailed-${post.id}`} path={`/${post.category}/${post.id}`} render ={() => (
              <div>
                <PostView post={post}/>
              </div>
            )}/>
          ))}
          <Route component={NoMatch}/>
        </Switch>
      </div>
    );
  }
}

function mapStateToProps( {posts} ) {
  return {...posts}
}

export default connect(mapStateToProps)(App)
