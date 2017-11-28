import { combineReducers } from 'redux'
import * as BackendAPI from '../utils/BackendAPI'
import {
  GET_ALL_POSTS,
  GET_ALL_CATEGORIES,
  GET_ALL_COMMENTS,
} from '../actions'

function initialState() {
  const state = {}
  BackendAPI.getAllPosts().then(value => state.posts = value)
  BackendAPI.getCategories().then(value => state.categories = value)
  return state
}

function posts (state = initialState(), action) {

  switch (action.type) {
    case GET_ALL_POSTS:
      return {
        ...state,
        posts: action.posts
      }
    case GET_ALL_CATEGORIES:
      return {
        ...state,
        categories: action.categories
      }
    default:
      return state
  }
}

function comments (state = {comments: []}, action) {

  switch (action.type) {
    case GET_ALL_COMMENTS:
      return {
        ...action.comments
      }
    default:
      return state
  }
}

export default combineReducers({
  posts,
  comments
})
