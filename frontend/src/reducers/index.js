import * as BackendAPI from '../BackendAPI'
import {
  GET_ALL_POSTS,
  GET_ALL_CATEGORIES,
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
    default:
      return state
  }
}

export default posts
