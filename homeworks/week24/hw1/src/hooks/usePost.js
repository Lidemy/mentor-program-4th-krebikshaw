import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  selectPost,selectAuthor, selectPosts, setPage, getTotalPages, deletePost,
  selectIsLoadingGetPosts, getPosts, getAllPosts, getPostById, setErrorMessage,
  selectErrorMessage, selectCurrentPage, selectTotalPages, postArticle, updateArticle
} from '../redux/slices/postSlice';

export default function usePost() {
  const dispatch = useDispatch();
  const history = useHistory();
  const posts = useSelector(selectPosts);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const post = useSelector(selectPost);
  const author = useSelector(selectAuthor);
  const isLoadingGetPosts = useSelector(selectIsLoadingGetPosts);
  const errorMessage = useSelector(selectErrorMessage);

  const handleGetPosts = () => dispatch(getPosts(currentPage));
  const handleChangePage = number => dispatch(setPage(number));
  const handleSetPage = () => dispatch(getTotalPages());
  const handleGetAllPosts = () => dispatch(getAllPosts());
  const handleGetPostById = id => dispatch(getPostById(id));
  const handlePostArticle = data => {
    dispatch(setErrorMessage(''));
    if (!data.title.trim() || !data.content.trim()) return dispatch(setErrorMessage('欄位不可空白'));
    dispatch(postArticle(data)).then(result => {
      history.push(`/article/${result.id}`);
    });
  }
  const handleUpdateArticle = (id, data) => { 
    dispatch(setErrorMessage(''));
    if (!data.title.trim() || !data.content.trim()) return dispatch(setErrorMessage('欄位不可空白'));
    dispatch(updateArticle(id, data)).then(result => {
      history.push(`/article/${result.id}`);  
    });
  }
  const handleDeletePost = id => deletePost(id).then(() => { 
    history.push('/');
    handleGetPosts();
  })

  return {
    post,
    author,
    posts,
    currentPage,
    totalPages,
    errorMessage,
    isLoadingGetPosts,
    handleGetPosts,
    handleSetPage,
    handleGetAllPosts,
    handleGetPostById,
    handleChangePage,
    handlePostArticle,
    handleUpdateArticle,
    handleDeletePost
  };
};