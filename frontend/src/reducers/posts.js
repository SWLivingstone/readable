import {
  GET_ALL_POSTS,
  GET_ALL_CATEGORIES,
} from '../actions/types'

export default function posts (state = {}, action) {

  switch (action.type) {
    case GET_ALL_POSTS:
      return {
        ...state,
        posts: {...action.posts}
      }
    case GET_ALL_CATEGORIES:
      return {
        ...state,
        categories: {...action.categories}
      }
    default:
      return state
  }
}
