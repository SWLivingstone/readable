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

export const addComment = (newComment, comments) => dispatch => (
  BackendAPI.addComment(newComment)
    .then( () => dispatch(receiveComments(comments)))
)

export const updateComment = (commentParams, id, comments) => dispatch => (
  BackendAPI.updateComment(id, commentParams)
    .then( () => dispatch(receiveComments(comments)))
)

export const deleteComment = (commentID, comments) => dispatch => (
  BackendAPI.deleteComment(commentID)
    .then( () => dispatch(receiveComments(comments)))
)

export function receiveComments (comments) {
  return {
    type: GET_ALL_COMMENTS,
    comments: comments
  }
}
