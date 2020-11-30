import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import useUser from "../../hooks/useUser";
import usePost from "../../hooks/usePost";

const UpdateButton = styled(Link)`
  transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, color 0.2s ease-in-out;
  line-height: 1em;
  min-width: 4.2em;
  padding: 0.5em 1em;
  margin: 1em 1em;
  background-color: transparent;
  border-radius: 4px;
  border: solid 1px #89b9e6;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  color: #89b9e6;
  font-size: ${props => props.theme.font_size.text};
  &:hover {
    border-color: #0088ff;
	  color: #0088ff !important;
  }
`;
const DeleteButton = styled.div`
  transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, color 0.2s ease-in-out;
  line-height: 1em;
  min-width: 4.2em;
  padding: 0.5em 1em;
  margin: 1em auto;
  background-color: transparent;
  border-radius: 4px;
  border: solid 1px #d88888;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  color: #d88888;
  font-size: ${props => props.theme.font_size.text};
  &:hover {
    border-color: #ff7496;
    color: #ff7496 !important;
  }
`;

const Options = ({ id, post }) => {
  const { user } = useUser();
  const { handleDeletePost } = usePost();
  const handleClickDeleteButton = () => {
    if (!user && id !== user.id) return;
    handleDeletePost(post.id);
  }

  if (user && id === user.id) {
    return (
      <>
        <UpdateButton to={`/update/${post.id}`}>編輯</UpdateButton>
        <DeleteButton onClick={handleClickDeleteButton}>刪除</DeleteButton>
      </>
    )
  }
  return <></>
}

export default Options;