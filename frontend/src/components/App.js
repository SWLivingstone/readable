import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
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
            <Redirect to='/all'/>
          )}/>
          <Route path='/:category' exact component={PostIndex}/>
          <Route path='/admin/add-post/' exact component={AddEditPost}/>
          <Route path= '/:category/:post' exact component={PostView}/>
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
