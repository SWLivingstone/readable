import React, { Component } from 'react';
import * as BackendAPI from '../BackendAPI'
import logo from '../logo.svg';
import '../App.css';
import Header from './Header'

class App extends Component {
  state = {
    categories: []
  }

  componentWillMount() {
    BackendAPI.getCategories()
      .then(categories => this.setState({categories}))
  }


  render() {
    return (
      <div className="App">
        <Header/>
        <div>
          {this.state.categories.map(category => (
            <p>{category.name}<br/>{category.path}</p>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
