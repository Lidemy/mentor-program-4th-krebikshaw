import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import useUser from "../../hooks/useUser";

const RegisterPageContainer = styled.div``;

const Wrapper = styled.div`
  margin: 80px 100px;
  text-align: center;
`;

const Title = styled.div`
  color: ${props => props.theme.colors.primary};
  letter-spacing: 0.1rem;
  font-size: ${props => props.theme.font_size.title};
  font-weight: normal;
  margin: 50px 0;
`;

const RegisterForm = styled.form`
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & input[type="text"], & input[type="password"] {
    width: 280px;
    height: 30px;
    margin: 10px 0;
    line-height: 28px;
    box-shadow: 0px 0px 5px 0px #00000063;
    background: #faebd700;
    border-radius: 8px;
    padding: 20px;
    &::placeholder {
      color: #e2dcdc;
    }
    &:focus {
      box-shadow: 0px 0px 5px 0px #245277;
    }
  }
  & div {
    display: flex;
    height: 80px;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
  }
  & button {
    width: 60px;
    margin: 0 15px;
    padding: 5px 0;
    text-shadow: 0 0 1px rgba(0,0,0,0.5);
    text-align: center;
    text-decoration: none;
    background: rgba(0,0,0,0);
    color: ${props => props.theme.colors.text};
    font-size: ${props => props.theme.font_size.text};
    &:hover {
      font-size: ${props => props.theme.font_size.hover};
    }
  }
`;

const ErrorMessage = styled.div`
  color: ${props => props.theme.colors.error};
  margin: -20px;
`;

const RegisterPage = () => {
  const history = useHistory();
  const { handleRegister, errorMessage } = useUser();
  const [data, setData] = useState({
    nickname: '',
    username: '',
    password: ''
  });
  const handleChangeInput = e => {
    const name = e.target.name;
    setData({
      ...data,
      [name]: e.target.value
    })
  }
  const handleSubmit = e => {
    e.preventDefault();
    handleRegister(data.nickname, data.username, data.password);
  }
  const handleBackToLastPage = () => {
    history.push('/');
  }

  return (
    <RegisterPageContainer>
      <Wrapper>
        <Title>註冊會員</Title>
        { errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage> }
        <RegisterForm>
          <input value={data.nickname} onChange={handleChangeInput} type="text" name="nickname" placeholder="暱稱" />
          <input value={data.username} onChange={handleChangeInput} type="text" name="username" placeholder="帳號" />
          <input value={data.password} onChange={handleChangeInput} type="password" name="password" placeholder="密碼" />
          <div>
            <button onClick={handleSubmit}>提交</button>
            <button onClick={handleBackToLastPage}>返回</button>
          </div>
        </RegisterForm>
      </Wrapper>
    </RegisterPageContainer>
  )
}

export default RegisterPage;