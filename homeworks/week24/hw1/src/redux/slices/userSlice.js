import { createSlice } from '@reduxjs/toolkit';
import { getMe as getMeAPI } from '../../WebAPI';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    isLoadingGetMe: false
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserEmpty: state => {
      state.user = null;
    },
    setIsLoadingGetMe: (state, action) => {
      state.isLoadingGetMe = action.payload;
    }
  }
});
export const { setUser, setUserEmpty, setIsLoadingGetMe } = userSlice.actions;

export const getMe = () => dispatch => {
  dispatch(setIsLoadingGetMe(true));
  getMeAPI().then(result => {
    dispatch(setIsLoadingGetMe(false));
    if (result.ok === 0) return;
    dispatch(setUser(result.data));
  });
}

export const selectUser = state => state.user.user;
export const selectIsLoadingGetMe = state => state.user.isLoadingGetMe;
export default userSlice.reducer;