import { GET_ALL_POSTS } from './types'
import * as BackendAPI from '../utils/BackendAPI'

export const fetchPosts = () => dispatch => (
  BackendAPI.getAllPosts()
    .then(posts => dispatch(receivePosts(posts)))
)

export function receivePosts (posts) {
  return {
    type: GET_ALL_POSTS,
    posts: posts
  }
}
