export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES'
export const GET_ALL_POSTS = 'GET_ALL_POSTS'

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
