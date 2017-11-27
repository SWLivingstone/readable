export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES'
export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const GET_ALL_COMMENTS = 'GET_ALL_COMMENTS'

export function getCategories (categories) {
  return {
    type: GET_ALL_CATEGORIES,
    categories: categories
  }
}

export function getPosts (posts) {
  return {
    type: GET_ALL_POSTS,
    posts: posts
  }
}

export function getComments (comments) {
  return {
    type: GET_ALL_COMMENTS,
    comments: comments
  }
}
