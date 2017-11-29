import { GET_ALL_COMMENTS } from '../actions/types'

export default function comments (state = {comments: []}, action) {

  switch (action.type) {
    case GET_ALL_COMMENTS:
      return {
        ...action.comments
      }
    default:
      return state
  }
}
