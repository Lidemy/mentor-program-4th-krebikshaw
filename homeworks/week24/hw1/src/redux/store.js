import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/slices/userSlice';
import postReducer from '../redux/slices/postSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    post: postReducer
  },
});
