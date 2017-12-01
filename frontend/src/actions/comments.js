import { GET_ALL_COMMENTS } from './types'
import * as BackendAPI from '../utils/BackendAPI'

export const fetchComments = (postID) => dispatch => (
  BackendAPI.getComments(postID)
    .then(comments => dispatch(receiveComments(comments)))
)

export const voteComments = (vote, commentID, comments) => dispatch => (
  BackendAPI.commentVote(vote, commentID)
    .then( () => dispatch(receiveComments(comments)))
)

export function receiveComments (comments) {
  return {
    type: GET_ALL_COMMENTS,
    comments: comments
  }
}
