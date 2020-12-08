import React, { useEffect } from "react";
import useUser from "./hooks/useUser";
import styled from "styled-components";
import Navbar from "./components/Navbar";
import PageLink from "./components/PageLink";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Article from "./pages/Article";
import Update from "./pages/Update";
import Post from "./pages/Post";
import List from "./pages/List";
import About from "./pages/About";
import Footer from "./components/Footer";
import GlobalStyle from "./constants/style";
import { ThemeProvider } from "styled-components";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

const theme = {
  colors: {
    primary: '#245277',
    text: '#787b7b',
    cross_line: '#6daeaf',
    read_more: '#0891ff',
    error: '#f53224'
  },
  bg_colors: {
    bg_primary: '#f2fffb'
  },
  font_size: {
    brand: '2rem',
    title: '1.6rem',
    text: '1rem',
    input: '1.5rem',
    hover: '1.05rem'
  },
};

const Root = styled.div`
  position: relative;
  background: url(https://static.wixstatic.com/media/bc3ec7bc825c4e6ca746c659189cea83.jpg) center/cover no-repeat;
  background-attachment: fixed;
`;

const Wrapper = styled.div`
  min-height: 90vh;
  position: relative;
  padding: 40px 60px;
  margin: 0 220px;
  background: rgba(255,255,255, 0.6);
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.5);
  border-radius: 8px;
  z-index: 2;
`;

const App = () => {
  const {
    isLoadingGetMe,
    initialize
  } = useUser();
  useEffect(() => initialize(), [])

  return (
    <Root>
      <ThemeProvider theme={ theme }>
        <GlobalStyle />
        <Router>
          <Wrapper>
            { !isLoadingGetMe && <Navbar /> }
            <PageLink />
            <Switch>
              <Route exact path = "/">
                <HomePage />
              </Route>
              <Route path = "/login">
                <LoginPage />
              </Route>
              <Route path = "/register">
                <RegisterPage />
              </Route>
              <Route path = "/article">
                <Article />
              </Route>
              <Route path = "/post">
                <Post />
              </Route>
              <Route path = "/update">
                <Update />
              </Route>
              <Route path = "/list">
                <List />
              </Route>
              <Route path = "/about">
                <About />
              </Route>
            </Switch>
          </Wrapper>
          <Footer />
        </Router>
      </ThemeProvider>
    </Root>
  )
}

export default App;