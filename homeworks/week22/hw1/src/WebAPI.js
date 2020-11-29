const BASE_URL = 'https://student-json-api.lidemy.me';

const login = (username, password) => {
  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  })
    .then(res => res.json())
}

const getMe = () => {
  const token = localStorage.getItem('token');
  return fetch(`${BASE_URL}/me`, {
    headers: {
      'authorization': `Bearer ${token}`
    }
  })
    .then(res => res.json())
}

const getPosts = page => {
  return fetch(`${BASE_URL}/posts?_page=${page}&_limit=5`)
    .then(res => {
      return res.json();
    });
}

const getAllPosts = () => {
  return fetch(`${BASE_URL}/posts`)
    .then(res => {
      return res.json();
    });
}

const getPostById = id => {
  return fetch(`${BASE_URL}/posts?id=${id}`)
    .then(res => {
      return res.json();
    })
    .then(post => {
      return post[0];
    })
}

const postArticle = (title, content) => {
  const token = localStorage.getItem('token');
  return getMe()
    .then(res => {
      let userId = res.data.id
      return fetch(`${BASE_URL}/posts`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({
          userId,
          title,
          body: content
        })
      })
        .then(res => res.json())
    });
}

const getUserById = (id, userId) => {
  return fetch(`${BASE_URL}/posts?id=${id}&userId=${userId}&_expand=user`)
    .then(res => {
      return res.json();
    })
    .then(post => {
      return post[0].user
    })
}

const getTotalPages = () => {
  return fetch(`${BASE_URL}/posts`)
    .then(res => {
      return res.json()
    })
    .then(posts => {
      return Math.ceil(posts.length / 5)
    })
}

export {
  login,
  getMe,
  getPosts,
  getAllPosts,
  getPostById,
  postArticle,
  getUserById,
  getTotalPages
}