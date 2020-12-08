import React, { useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import usePost from "../../hooks/usePost";
import Options from "../../components/OptionsButton";

const ArticleContainer = styled.div``;

const Wrapper = styled.div`
  min-height: 70vh;
  padding: 0 30px;
  & div {
    display: flex;
    align-items: center;
  }
`;

const PostTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ArticleTitle = styled.h1`
  color: ${props => props.theme.colors.primary};
  letter-spacing: 0.1rem;
  font-size: ${props => props.theme.font_size.title};
  font-weight: normal;
  line-height: 1.8rem;
  margin: 80px 0 20px 0;
`;

const PostOption = styled.div`
  display: flex;
  align-items: center;
`;

const ArticleDate = styled.div`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.font_size.text};
  margin-left: 60px;
`;

const ArticleAuthor = styled.div``;

const ArticleContent = styled.div`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.font_size.text};
  width: 100%;
  line-height: 1.5rem;
  letter-spacing: 0.1rem;
  margin: 50px 0;
`;

const ArticleBottom = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 0 20px 0;
`;

const BackButton = styled.div`
  padding: 5px 0;
  text-shadow: 0 0 1px rgba(0,0,0,0.5);
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.font_size.text};
  &:hover {
    font-size: ${props => props.theme.font_size.hover};
  }
`;

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
  justify-content: center;
  align-items: center;
  background: url(https://static.wixstatic.com/media/bc3ec7bc825c4e6ca746c659189cea83.jpg) center/cover no-repeat;
  & p {
    font-size: 50px;
    color: ${props => props.theme.colors.text};
  }
`;

const Article = () => {
  const id = useLocation().pathname.split('/')[2];
  const {
    post,
    author,
    isLoadingGetPosts,
    handleGetPostById,
    errorMessage
  } = usePost();

  useEffect(() => handleGetPostById(id), []);
  const handleBackToLastPage = () => window.history.go(-1);

  return (
    <ArticleContainer>
      <Wrapper>
        { isLoadingGetPosts && <Loading><p>Loading...</p></Loading> }
        { errorMessage && <ErrorMessage>系統不穩定，請再試一次</ErrorMessage> }
        <PostTop>
          <ArticleTitle>{post.title}</ArticleTitle>
          <PostOption>
            <Options id={post.userId} post={post} />
          </PostOption>
        </PostTop>
        <div>  
          <ArticleAuthor>
            { author }
          </ArticleAuthor>
          <ArticleDate>{ !isLoadingGetPosts && new Date(post.createdAt).toLocaleString()}</ArticleDate>
        </div>
        <ArticleContent>{post.body}</ArticleContent>
      </Wrapper>
      <ArticleBottom>
        { !isLoadingGetPosts && <BackButton onClick={handleBackToLastPage}>返回</BackButton>}
      </ArticleBottom>
    </ArticleContainer>
  )
}

export default Article;