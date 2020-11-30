import { createSlice } from '@reduxjs/toolkit';
import { 
  getPosts as getPostsAPI,
  getTotalPages as getTotalPagesAPI,
  getAllPosts as getAllPostsAPI,
  getPostById as getPostByIdAPI,
  getUserById as getUserByIdAPI,
  postArticle as postArticleAPI,
  updateArticle as updateArticleAPI,
  deletePost as deletePostAPI
} from "../../WebAPI";

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    post: {},
    author: null,
    posts: [],
    currentPage: 1,
    totalPages: 1,
    isLoadingGetPosts: false,
    errorMessage: null
  },
  reducers: {
    setPost: (state, action) => {
      state.post = action.payload;
    },
    setAuthor: (state, action) => {
      state.author = action.payload;
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload
    },
    setIsLoadingGetPosts: (state, action) => {
      state.isLoadingGetPosts = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    }
  }
});
export const {
  setPost, setAuthor, setPosts, setPage, setTotalPages,
  setIsLoadingGetPost, setIsLoadingGetPosts, setErrorMessage 
} = postSlice.actions;

export const getPosts = page => dispatch => {
  dispatch(setIsLoadingGetPosts(true));
  getPostsAPI(page).then(result => {
    dispatch(setIsLoadingGetPosts(false));
    if (!result || result.ok === 0) return dispatch(setErrorMessage(result ? result.message : 'something wrong'));
    dispatch(setPosts(result));
  })
}

export const getTotalPages = () => dispatch => {
  getTotalPagesAPI().then(number => dispatch(setTotalPages(number)))
}

export const getAllPosts = () => dispatch => {
  dispatch(setIsLoadingGetPosts(true));
  getAllPostsAPI().then(result => {
    dispatch(setIsLoadingGetPosts(false));
    if (!result || result.ok === 0) return dispatch(setErrorMessage(result ? result.message : 'something wrong'));
    dispatch(setPosts(result));
  })
}

export const getPostById = id => dispatch => {
  dispatch(setIsLoadingGetPosts(true));
  return getPostByIdAPI(id)
    .then(result => {
      dispatch(setIsLoadingGetPosts(false));
      if (!result || result.ok === 0) return dispatch(setErrorMessage(result ? result.message : 'something wrong'));
      dispatch(setPost(result));
      return getUserByIdAPI(result.id, result.userId)
    })
    .then(result => {
      if (!result || result.ok === 0) return dispatch(setErrorMessage(result ? result.message : 'something wrong'));
      dispatch(setAuthor(result.nickname));
      return result.id
    })
}

export const postArticle = (data) => dispatch => {
  return postArticleAPI(data.title, data.content)
    .then(result => {
      if (!result || result.ok === 0) return dispatch(setErrorMessage(result ? result.message : 'something wrong'));
      return result;
    })
}

export const updateArticle = (id, data) => dispatch => {
  return updateArticleAPI(id, data.title, data.content)
    .then(result => {
      if (!result || result.ok === 0) return dispatch(setErrorMessage(result ? result.message : 'something wrong'));
      return result;
    })
}

export const deletePost = id => deletePostAPI(id);
export const selectPost = state => state.post.post;
export const selectAuthor = state => state.post.author;
export const selectPosts = state => state.post.posts;
export const selectCurrentPage = state => state.post.currentPage;
export const selectTotalPages = state => state.post.totalPages;
export const selectIsLoadingGetPosts = state => state.post.isLoadingGetPosts;
export const selectErrorMessage = state => state.post.errorMessage;
export default postSlice.reducer;
