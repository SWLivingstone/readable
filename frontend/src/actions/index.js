import * as Action from './types'

export function getCategories (categories) {
  return {
    type: Action.GET_ALL_CATEGORIES,
    categories: categories
  }
}

export function getPosts (posts) {
  return {
    type: Action.GET_ALL_POSTS,
    posts: posts
  }
}

export function getComments (comments) {
  return {
    type: Action.GET_ALL_COMMENTS,
    comments: comments
  }
}
