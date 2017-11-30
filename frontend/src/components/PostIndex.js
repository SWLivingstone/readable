import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddPostButton from './AddPostButton'
import PostMiniView from './PostMiniView'
import { objToArray } from '../utils/ObjectToArray'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

class PostIndex extends Component {
  state = {
    orderBy: 'voteScore',
    order: 'desc'
  }

  asc = (a,b) => a < b
  desc = (a,b) => a > b

  insertionSort(array, orderBy, order = this.state.order) {
    const sortedArray = []
    array.forEach(post => {
      if (sortedArray.length < 1) {
        sortedArray.push(post)
      }
      else {
        let temp = post
        sortedArray.forEach((value, index) => {
          if (this[order](temp[orderBy], value[orderBy])) {
            sortedArray[index] = temp
            temp = value
          }
          if (sortedArray.length === index + 1)
            sortedArray.push(temp)
        })
      }
    })
    return sortedArray
  }


  filterPosts() {
    if (this.props.filter === 'all')
      return this.insertionSort(objToArray(this.props.posts), this.state.orderBy)
    else
      return (
        this.insertionSort(
          objToArray(this.props.posts).filter(post => {
            return post.category === this.props.filter
          }), this.state.orderBy
        )
      )
  }

  orderByHandler(event, index, value) {
    this.setState({orderBy: value})
  }

  orderHandler(event, index, value) {
    this.setState({order: value})
  }


  render () {
    return(
      <div className="container post-index">
        <div>
          <SelectField
            className="order-by-select"
            value={this.state.orderBy}
            floatingLabelText="Order By"
            onChange={(e, i, v) => this.orderByHandler(e, i, v)}>
            <MenuItem value="voteScore" primaryText="Votes"/>
            <MenuItem value="timestamp" primaryText="Time Posted"/>
            <MenuItem value="title" primaryText="Title"/>
            <MenuItem value="author" primaryText="Author"/>
          </SelectField>
          <SelectField
            value={this.state.order}
            floatingLabelText="Descening/Ascending"
            onChange={(e, i, v) => this.orderHandler(e, i, v)}>
            <MenuItem value="asc" primaryText="Ascending"/>
            <MenuItem value="desc" primaryText="Descending"/>
          </SelectField>
        </div>
        {this.props.posts && this.filterPosts().map(post => (
          <PostMiniView post={post} key={post.id}/>
        ))}
        <AddPostButton/>
      </div>
    )
  }
}

function mapStateToProps({posts}) {
  return { ...posts }
}

export default connect(mapStateToProps)(PostIndex)
