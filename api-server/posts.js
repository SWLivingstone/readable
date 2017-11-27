const clone = require('clone')

let db = {}

const defaultData = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    title: 'Udacity is the best place to learn React',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque porttitor dui rutrum hendrerit blandit. Praesent massa nibh, gravida gravida fermentum quis, finibus eget mi. Nullam consequat posuere imperdiet. Nulla aliquet lacus nunc, ut sodales arcu aliquam nec. Donec vestibulum leo a nisi dignissim consequat. Donec vitae urna arcu. Phasellus suscipit, est maximus molestie congue, risus nunc lobortis metus, ac ultricies diam diam eget eros. Nulla elementum hendrerit orci, quis blandit velit fringilla non. Morbi ac pulvinar massa. Nam sed ex sed enim porta imperdiet quis ac dolor. Mauris gravida fermentum erat quis cursus. Praesent placerat sollicitudin ex, et pharetra ante. Nulla facilisi. Maecenas in ultrices elit. Maecenas quis dolor vestibulum, aliquam dolor ullamcorper, ultrices lorem. Praesent quis sollicitudin dolor, at finibus augue. Maecenas sollicitudin arcu a malesuada varius. Praesent metus urna, auctor auctor condimentum in, rhoncus in nisi. Nunc blandit suscipit metus, volutpat egestas ante lobortis vitae. Suspendisse nulla mi, consequat nec molestie vel, congue nec magna. Praesent scelerisque egestas nibh, id fermentum felis pharetra et. Nullam mattis ornare urna. Suspendisse commodo molestie tortor, non sollicitudin enim sollicitudin quis.',
    author: 'thingtwo',
    category: 'react',
    voteScore: 6,
    deleted: false,
    commentCount: 2
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1468479767190,
    title: 'Learn Redux in 10 minutes!',
    body: 'Nulla sodales odio lectus, eget tincidunt nunc pellentesque sed. Nunc tempor, nunc vel porta ullamcorper, lectus nulla sagittis sem, quis congue turpis nisl a lorem. Vestibulum non ullamcorper leo, et pulvinar ipsum. Fusce scelerisque purus sed interdum faucibus. Vivamus scelerisque dignissim magna luctus facilisis. Maecenas ac neque erat. Quisque ante eros, tincidunt accumsan magna at, dapibus porta tellus. Praesent cursus dolor ac orci pretium elementum. Cras tristique vitae ligula eu placerat. Phasellus non ultricies neque, sed tincidunt ipsum. Proin rhoncus semper libero, eget egestas lectus efficitur at. Maecenas cursus orci ac lectus ultrices, ac imperdiet nulla molestie. Suspendisse viverra dui ut odio dictum rhoncus. Vestibulum vel mi eu nisl rhoncus facilisis. Sed ut dui vitae mauris sagittis semper.',
    author: 'thingone',
    category: 'redux',
    voteScore: -5,
    deleted: false,
    commentCount: 0
  }
}

function getData (token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByCategory (token, category) {
  return new Promise((res) => {
    let posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => posts[key].category === category && !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function get (token, id) {
  return new Promise((res) => {
    const posts = getData(token)
    res(
      posts[id].deleted
        ? {}
        : posts[id]
    )
  })
}

function getAll (token) {
  return new Promise((res) => {
    const posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function add (token, post) {
  return new Promise((res) => {
    let posts = getData(token)

    posts[post.id] = {
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      voteScore: 1,
      deleted: false,
      commentCount: 0
    }

    res(posts[post.id])
  })
}

function vote (token, id, option) {
  return new Promise((res) => {
    let posts = getData(token)
    post = posts[id]
    switch(option) {
        case "upVote":
            post.voteScore = post.voteScore + 1
            break
        case "downVote":
            post.voteScore = post.voteScore - 1
            break
        default:
            console.log(`posts.vote received incorrect parameter: ${option}`)
    }
    res(post)
  })
}

function disable (token, id) {
    return new Promise((res) => {
      let posts = getData(token)
      posts[id].deleted = true
      res(posts[id])
    })
}

function edit (token, id, post) {
    return new Promise((res) => {
        let posts = getData(token)
        for (prop in post) {
            posts[id][prop] = post[prop]
        }
        res(posts[id])
    })
}

function incrementCommentCounter(token, id, count) {
  const data = getData(token)
  if (data[id]) {
    data[id].commentCount += count
  }
}

module.exports = {
  get,
  getAll,
  getByCategory,
  add,
  vote,
  disable,
  edit,
  getAll,
  incrementCommentCounter
}
