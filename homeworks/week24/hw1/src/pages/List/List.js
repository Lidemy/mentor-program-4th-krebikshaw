import React, { useEffect } from "react";
import styled from "styled-components";
import usePost from "../../hooks/usePost";
import { Link } from "react-router-dom";
import Options from "../../components/OptionsButton";

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

const PostTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  max-width: 550px;
  overflow-wrap: break-word;
  color: ${props => props.theme.colors.primary};
  letter-spacing: 0.1rem;
  line-height: 1.8rem;
  font-size: ${props => props.theme.font_size.title};
  font-weight: normal;
  margin: 10px 0;
`;

const PostOption = styled.div`
  display: flex;
  align-items: center;
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
      <PostTop>
        <Title>{post.title}</Title>
        <PostOption>
          <Options id={post.userId} post={post} />
        </PostOption>
      </PostTop>
      <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
      <ReadMore to={`/article/${post.id}`}>繼續閱讀</ReadMore>
    </ListItemContainer>
  )
}

const List = () => {
  const {
    posts,
    handleGetAllPosts,
    isLoadingGetPosts,
    errorMessage
  } = usePost();

  useEffect(() => handleGetAllPosts(), []);

  if (isLoadingGetPosts) return (
    <Loading>
      <p>Loading...</p>
    </Loading>
  )
  
  if (errorMessage) return <ErrorMessage>系統不穩定，請再試一次</ErrorMessage>;

  return (
    <ListContainer>
      {posts.map((post) => (
        <ListItem key={post.id} post={post} />
      ))}
    </ListContainer>
  )
}

export default List;