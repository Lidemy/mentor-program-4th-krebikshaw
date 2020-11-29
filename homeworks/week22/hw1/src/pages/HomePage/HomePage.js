import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Paging from "../../components/Paging";
import { getPosts, getTotalPages } from "../../WebAPI";
import { Link } from "react-router-dom";

const Root = styled.div``;

const PostContainer = styled.div`
  padding: 20px 30px;
  /*border-left: 5px solid ${props => props.theme.colors.primary};*/
  margin-bottom: 50px;
  border-radius: 5px;
  box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.2);
`;

const PostTitle = styled.h2`
  color: ${props => props.theme.colors.primary};
  letter-spacing: 0.1rem;
  font-size: ${props => props.theme.font_size.title};
  font-weight: normal;
  margin: 15px 0;
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
      <PostTitle>{post.title}</PostTitle>
      <PostContent>{post.body}</PostContent>
      <ReadMore to={`/article/${post.id}`}>繼續閱讀</ReadMore>
    </PostContainer>
  )
}

const HomePage = () => {
  const [apiError, setApiError] = useState('');
  const [isLoadingGetPosts, setIsLoadingGetPosts] = useState(false);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState({
    currentPage: 1,
    totalPages: 1
  });

  const handleChangePage = number => {
    setPage({ ...page, currentPage: number });
  }

  useEffect(() => {
    setIsLoadingGetPosts(true);
    getPosts(1)
      .then(result => {
        setIsLoadingGetPosts(false);
        setPosts(result);
      })
      .catch(err => setApiError(err.message));
    getTotalPages().then(number => setPage({ ...page, totalPages: number }));
  }, [])

  useEffect(() => {
    getPosts(page.currentPage)
      .then(result => {
        setPosts(result);
      })
      .catch(err => setApiError(err.message));;
  }, [page])

  return (
    <Root>
      <HomePageContainer>
        { isLoadingGetPosts && <Loading><p>Loading...</p></Loading> }
        { posts.map(post => <Post key={post.id} post={post} />) }
        { apiError && <ErrorMessage>系統不穩定，請再試一次</ErrorMessage> }
      </HomePageContainer>
      { !isLoadingGetPosts && <Paging page={page} handleChangePage={handleChangePage} /> }
    </Root>
  )
}

export default HomePage;