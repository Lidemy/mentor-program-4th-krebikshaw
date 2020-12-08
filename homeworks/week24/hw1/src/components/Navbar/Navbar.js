import React, { useContext } from "react";
import styled from "styled-components";
import { Link, useHistory, useLocation } from "react-router-dom";
import useUser from '../../hooks/useUser';

const NavbarContainer = styled.div`
  height: 50px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  box-shadow: 0 0 3px #024048;
  background: linear-gradient(#dbdbdb, rgba(255,255,255,0.85));
  z-index: 99;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Brand = styled(Link)`
  margin-left: 80px;
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.font_size.brand};
  font-weight: initial;
  text-shadow: 0 0 5px rgba(0,0,0,0.2);
`;

const NavbarList = styled.ul`
  margin-right: 80px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const ListItem = styled(Link)`
  margin: 10px;
  width: 45px;
  font-size: ${props => props.theme.font_size.text};
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  &:hover {
    font-size: ${props => props.theme.font_size.hover};
  }
`;

const LogoutButton = styled.div`
  margin: 10px;
  width: 45px;
  font-size: ${props => props.theme.font_size.text};
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  &:hover {
    font-size: ${props => props.theme.font_size.hover};
  }
`;

const Navbar = () => {
  const history = useHistory();
  const location = useLocation();
  const {
    user,
    handleLogout
  } = useUser();
  const logout = () => {
    handleLogout();
    if (location.pathname !== '/') history.push('/');
  }

  return (
    <NavbarContainer>
      <Brand to="/">
        SPA-BLOG
      </Brand>
      <NavbarList>
        { !user && (
          <>
            <ListItem to="/register">註冊</ListItem>
            <ListItem to="/login">登入</ListItem>
          </>
        )}
        { user && <LogoutButton onClick={logout}>登出</LogoutButton>}
      </NavbarList>
    </NavbarContainer>
  )
}

export default Navbar;