import React, { useEffect } from "react";
import usePost from '../../hooks/usePost';
import styled from "styled-components";
import Pagination from "../../components/Pagination";
import Options from "../../components/OptionsButton";
import { Link } from "react-router-dom";

const Root = styled.div``;

const PostContainer = styled.div`
  padding: 20px 30px;
  /*border-left: 5px solid ${props => props.theme.colors.primary};*/
  margin-bottom: 50px;
  border-radius: 5px;
  box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.2);
`;

const PostTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PostTitle = styled.h2`
  width: 85%;
  color: ${props => props.theme.colors.primary};
  letter-spacing: 0.1rem;
  line-height: 1.8rem;
  font-size: ${props => props.theme.font_size.title};
  font-weight: normal;
  margin: 15px 0;
`;

const PostOption = styled.div`
  display: flex;
  align-items: center;
`;

const PostContent = styled.div`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.font_size.text};
  width: 100%;
  max-height: 72px;
  line-height: 1.5rem;
  letter-spacing: 0.1rem;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 20px 0;
`;

const ReadMore = styled(Link)`
  color: ${props => props.theme.colors.read_more};
  font-size: ${props => props.theme.font_size.text};
  &:hover {
    font-size: ${props => props.theme.font_size.hover};
  }
`;

const HomePageContainer = styled.div``;

const ErrorMessage = styled.div`
  color: ${props => props.theme.colors.error};
  margin: 20px 0 400px 0;
`;

const Loading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  background: url(https://static.wixstatic.com/media/bc3ec7bc825c4e6ca746c659189cea83.jpg) center/cover no-repeat;
  justify-content: center;
  align-items: center;
  & p {
    font-size: 50px;
    color: ${props => props.theme.colors.text};
  }
`;

const Post = ({ post }) => {
  return (
    <PostContainer>
      <PostTop>
        <PostTitle>{post.title}</PostTitle>
        <PostOption>
          <Options id={post.userId} post={post} />
        </PostOption>
      </PostTop>
      <PostContent>{post.body}</PostContent>
      <ReadMore to={`/article/${post.id}`}>繼續閱讀</ReadMore>
    </PostContainer>
  )
}

const HomePage = () => {
  const {
    posts,
    currentPage,
    errorMessage,
    isLoadingGetPosts,
    handleGetPosts,
    handleSetPage
  } = usePost();

  useEffect(() => handleSetPage(), []);
  useEffect(() => handleGetPosts(), [currentPage]);

  return (
    <Root>
      <HomePageContainer>
        { isLoadingGetPosts && <Loading><p>Loading...</p></Loading> }
        { posts.map(post => <Post key={post.id} post={post} />) }
        { errorMessage && <ErrorMessage>系統不穩定，請再試一次</ErrorMessage> }
      </HomePageContainer>
      { !isLoadingGetPosts && <Pagination /> }
    </Root>
  )
}

export default HomePage;