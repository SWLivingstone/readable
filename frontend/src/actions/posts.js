import { GET_ALL_POSTS } from './types'
import * as BackendAPI from '../utils/BackendAPI'

export const fetchPosts = () => dispatch => (
  BackendAPI.getAllPosts()
    .then(posts => dispatch(receivePosts(posts)))
)

export const deletePost = (postID, posts) => dispatch => (
  BackendAPI.deletePost(postID)
    .then(posts => dispatch(receivePosts(posts)))
)

export const votePosts = (vote, postID, posts) => dispatch => (
  BackendAPI.postVote(vote, postID)
    .then(() => dispatch(receivePosts(posts)))
)

export function receivePosts (posts) {
  return {
    type: GET_ALL_POSTS,
    posts: posts
  }
}
