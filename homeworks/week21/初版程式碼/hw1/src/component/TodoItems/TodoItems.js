import React, { useState } from 'react';
import styled from 'styled-components';
import GlobalStyle from './../../constants/style';
import unchecked_icon from './../../svg/unchecked.svg'
import { ReactComponent as Unchecked } from './../../svg/unchecked.svg'
import checked_icon from './../../svg/checked.svg'
import { ReactComponent as Checked } from './../../svg/checked.svg'
import delete_icon from './../../svg/delete.svg'
import { ReactComponent as Delete } from './../../svg/delete.svg'

const TodoItem = styled.li`
  position: relative;
  font-size: ${props => props.theme.font_size.text};
  font-weight: lighter;
  color: ${props => props.theme.colors.text_primary};
  letter-spacing: 0.2em;
  list-style-type: none;
  text-align: left;
  margin: 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0,0,0,0.05);
  & p {
    margin: 0;
    padding: 0.3rem 0;
  }
  &:hover {
    text-shadow: 0 0 0.1px rgba(0,0,0,1);
    input[type="button"] {
      display: unset;
    }
  }
`;

const TodoToggle = styled.input`
  display: none;
  & + label {
    max-width: 460px;
    overflow: hidden;
    word-break: break-all;
    word-wrap: break-word; 
    padding: 0.1em;
    display: flex;
    align-items: center;
    cursor: pointer;
    margin: 0;
`;

const Icon = styled.span`
  min-width: 20px;
  min-height: 20px;
  cursor: pointer;
  filter: opacity(0.3);
  ${
    props => props.$isDone ? `
      background: url(${checked_icon}) center/cover no-repeat;
      margin: 7.5px 15px 7.5px 5px;
    ` : `
      background: url(${unchecked_icon}) center/cover no-repeat;
      margin: 7.5px 15px 7.5px 5px;
    `
  }
`;

const TodoText = styled.p`
  ${
    props => props.$isDone && `
      text-decoration: line-through;
    `
  }
`;

const DeleteButton = styled.input`
  display: none;
  position: absolute;
  right: 30px;
  top: 6px;
  border: none;
  outline: none;
  background: url(${delete_icon}) center/cover no-repeat;
  filter: opacity(0.3);
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const TextInput = styled.input`
  width: 100%;
  padding: 0.1em;
  font-size: 18px;
  font-weight: lighter;
  letter-spacing: 0.2em;
  line-height: 1.4em;
  outline: none;
`;

const InputBar = ( { text, handleEnterUpdate } ) => {
  const [value, setValue] = useState(text);

  const handleInputChange = e => {
    setValue(e.target.value)
  }

  const handleEnterInput = e => {
    if (e.keyCode === 13 && value !== '') {
      handleEnterUpdate(value)
    }
  }

  return (
    <TextInput type="text" value={value} onChange={ handleInputChange } onKeyDown={handleEnterInput}/>
  )
}

const TodoItems = ( { key, todo, handleDeleteTodo, handleToggleIsDone, handleUpdateTodo } ) => {
  const [text, setText] = useState(todo.content);
  const handleClickText = () => {
    setText('');
  }

  const handleEnterUpdate = text => {
    handleUpdateTodo(todo.id, text)
    setText(text);
  }

  return (
    <TodoItem>
      <TodoToggle  type='checkbox' id={todo.id} />
      <label for={todo.id}>
        <Icon  $isDone={todo.isDone} onClick={() => {
          handleToggleIsDone(todo.id)
        }}></Icon>
      </label>
      <TodoText $isDone={todo.isDone} onClick={handleClickText}>{text || <InputBar text={todo.content} handleEnterUpdate={handleEnterUpdate} />}</TodoText>
      <DeleteButton type='button' onClick={() => {
        handleDeleteTodo(todo.id)
      }} />
    </TodoItem>
  )
}

export default TodoItems;