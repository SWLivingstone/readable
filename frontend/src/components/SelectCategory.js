import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

class SelectCategory extends Component {

  render() {

    return(
      <nav className='nav-bar container'>
        <NavLink
          className='nav-link'
          to="/">
          All
        </NavLink>
        {this.props.categories && this.props.categories.map(category => (
          <NavLink
            key={`${category.name}-nav-link`}
            className='nav-link'
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
