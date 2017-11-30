import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { objToArray } from '../utils/ObjectToArray'

const SelectCategory = props => (
  <nav className='nav-bar container'>
    <NavLink
      activeClassName="active-link"
      to="/" exact>
      All
    </NavLink>
      {props.categories && objToArray(props.categories).map(category => (
      <NavLink
        key={`${category.name}-nav-link`}
        activeClassName="active-link"
        to={`/${category.name}-index`}
        >{category.name}
      </NavLink>
    ))}
  </nav>
)


function mapStateToProps({posts}) {
  return { ...posts }
}

export default connect(mapStateToProps)(SelectCategory)
