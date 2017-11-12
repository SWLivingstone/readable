import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'

class SelectCategory extends Component {

  render() {
    return(
      <nav>
        <NavLink
          className='nav-link'
          activeStyle={{color: 'red'}}
          to="/">
          All
        </NavLink>
        {this.props.categories && this.props.categories.map(category => (
          <NavLink
            className='nav-link'
            activeStyle={{color: 'red'}}
            to={`/${category.name}-index`}
            >{category.name}
          </NavLink>
        ))}
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories
  }
}

export default connect(mapStateToProps)(SelectCategory)
