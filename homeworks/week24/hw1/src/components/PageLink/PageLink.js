import React, { useContext } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import useUser from "../../hooks/useUser";

const PageLinkContainer = styled.div`
  height: 85px;
  width: 70%;
  padding: 40px 10px 10px 20px;
  border-bottom: 2px solid ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  margin-bottom: 40px;
`;

const LinkItem = styled(Link)`
  padding: 5px 0;
  margin-right: 50px;
  text-align: center;
  text-decoration: none;
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.font_size.text};
  &:hover {
    border-bottom: 3px solid ${props => props.theme.colors.primary};
  }
  ${
    props => props.$active && `
      border-bottom: 3px solid ${props.theme.colors.primary};
    `
  }
`;

const PageLink = () => {
  const location = useLocation();
  const {
    user
  } = useUser();

  return (
    <PageLinkContainer>
      <LinkItem to="/" $active={location.pathname === "/"}>
        首頁
      </LinkItem>
      { 
        user && <LinkItem to="/post" $active={location.pathname === "/post"}>
          發佈文章
        </LinkItem>
      }
      <LinkItem to="/list" $active={location.pathname === "/list"}>
        文章列表
      </LinkItem>
      <LinkItem to="/about" $active={location.pathname === "/about"}>
        關於
      </LinkItem>
    </PageLinkContainer>
  )
}

export default PageLink;