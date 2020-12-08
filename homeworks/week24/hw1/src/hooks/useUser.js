import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { selectUser, getMe, setUserEmpty, selectIsLoadingGetMe } from '../redux/slices/userSlice';
import { register as registerAPI, login as loginAPI } from '../WebAPI';

export default function useUser() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(selectUser);
  const isLoadingGetMe = useSelector(selectIsLoadingGetMe);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = (nickname, username, password) => {
    setErrorMessage('');
    if (!nickname.trim() || !username.trim() || !password.trim()) return setErrorMessage('欄位不可空白');
    registerAPI(nickname, username, password)
      .then(result => {
        if (result.ok === 0) return setErrorMessage('帳號已被註冊，請登入或使用其它帳號');
        localStorage.setItem('token', result.token);
        dispatch(getMe());
        history.push('/');
      })
      .catch(err => console.log(err));
  };
  const handleLogin = (username, password) => {
    setErrorMessage('');
    if (!username.trim() || !password.trim()) return setErrorMessage('欄位不可空白');
    loginAPI(username, password)
      .then(result => {
        if (result.ok === 0) return setErrorMessage('帳號或密碼錯誤');
        localStorage.setItem('token', result.token);
        dispatch(getMe());
        history.push('/');
      })
      .catch(err => console.log(err));
  }
  const handleLogout = () => {
    localStorage.setItem('token', null);
    dispatch(setUserEmpty());
  }
  const initialize = () => {
    dispatch(getMe());
  }

  return {
    user,
    handleRegister,
    handleLogin,
    handleLogout,
    errorMessage,
    initialize,
    isLoadingGetMe
  };
};