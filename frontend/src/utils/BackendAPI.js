const api = 'http://localhost:3001'

const headers = {
  'Authorization': 'test'
}

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)

export const addPost = postParams =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postParams)
  })
  .then(res => res.json())
  .then(data => data)

  export const deletePost = postID =>
    fetch(`${api}/posts/${postID}`, {
      method: 'DELETE',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => data)

export const postVote = (option, postID) =>
  fetch(`${api}/posts/${postID}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({option})
  })
  .then(res => res.json())
  .then(data => data)


export const updatePost = (postID, postParams) =>
  fetch(`${api}/posts/${postID}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postParams)
  })
  .then(res => res.json())
  .then(data => data)

export const getComments = (postID) =>
  fetch(`${api}/posts/${postID}/comments`, { headers })
  .then(res => res.json())
  .then(data => data)

export const commentVote = (option, commentID) =>
  fetch(`${api}/comments/${commentID}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({option})
  })
  .then(res => res.json())
  .then(data => data)

export const addComment = commentParams =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(commentParams)
  })
  .then(res => res.json())
  .then(data => data)


export const updateComment = (commentID, commentParams) =>
  fetch(`${api}/comments/${commentID}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(commentParams)
  })
  .then(res => res.json())
  .then(data => data)
