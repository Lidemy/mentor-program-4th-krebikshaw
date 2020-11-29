import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getAllPosts } from "../../WebAPI";
import { Link } from "react-router-dom";

const ListContainer = styled.div`
  padding-left: 30px;
  border-left: 5px solid ${props => props.theme.colors.primary};
  margin: 0 30px;
`;

const ErrorMessage = styled.div`
  color: ${props => props.theme.colors.error};
  margin: 20px 0 400px 0;
`;

const ListItemContainer = styled.div`
  margin: 30px 0;
  & div {
    position: relative;
    display: flex;
    align-items: center;
  }
`;

const Title = styled.h2`
  max-width: 550px;
  overflow-wrap: break-word;
  color: ${props => props.theme.colors.primary};
  letter-spacing: 0.1rem;
  font-size: ${props => props.theme.font_size.title};
  font-weight: normal;
  margin: 10px 0;
`;

const PostDate = styled.div`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.font_size.text};
  margin-bottom: 5px;
`;

const ReadMore = styled(Link)`
  color: ${props => props.theme.colors.read_more};
  font-size: ${props => props.theme.font_size.text};
  &:hover {
    font-size: ${props => props.theme.font_size.hover};
  }
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

const ListItem = ({ post }) => {
  return (
    <ListItemContainer>
      <Title>{post.title}</Title>
      <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
      <ReadMore to={`/article/${post.id}`}>繼續閱讀</ReadMore>
    </ListItemContainer>
  )
}

const List = () => {
  const [apiError, setApiError] = useState('');
  const [isLoadingGetPosts, setIsLoadingGetPosts] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setIsLoadingGetPosts(true);
    getAllPosts()
      .then(res => {
        setIsLoadingGetPosts(false);
        setPosts(res);
      })
      .catch(err => setApiError(err.message));
  }, [])

  return (
    <ListContainer>
      { isLoadingGetPosts && <Loading><p>Loading...</p></Loading> }
      { posts.map(post => <ListItem key={post.id} post={post} />) }
      { apiError && <ErrorMessage>系統不穩定，請再試一次</ErrorMessage> }
    </ListContainer>
  )
}

export default List;