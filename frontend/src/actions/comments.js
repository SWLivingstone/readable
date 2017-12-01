import { GET_ALL_COMMENTS } from './types'
import * as BackendAPI from '../utils/BackendAPI'

export const fetchComments = (postID) => dispatch => (
  BackendAPI.getComments(postID)
    .then(comments => dispatch(receiveComments(comments)))
)

export function receiveComments (comments) {
  return {
    type: GET_ALL_COMMENTS,
    comments: comments
  }
}
