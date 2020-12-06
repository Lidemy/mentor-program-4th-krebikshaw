import React from 'react';
import styled from 'styled-components';
import GlobalStyle from './constants/style';
import TodoItems from './component/TodoItems';
import TodoFooter from './component/TodoFooter';
import useTodo from './hooks/useTodo';

const TodoWrapper = styled.div``;

const TodoTitle = styled.div`
  color: ${props => props.theme.colors.title_primary};
  font-size: ${props => props.theme.font_size.title};
  text-align: center;
  margin: 50px;
  font-weight: 500;
  line-height: 1.2;
`;

const TodoBody = styled.div`
  background: ${props => props.theme.bg_colors.bg_primary};
  width: 550px;
  margin: 30px auto;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2), 0 25px 50px 0 rgba(0,0,0,0.1);
`;

const TodoInput = styled.input`
  padding: 16px 16px 16px 60px;
  border: none;
  box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
  outline: none;
  width: 100%;
  font-size: ${props => props.theme.font_size.input};
  font-weight: lighter;
  letter-spacing: 0.3rem;
  line-height: 1rem;
  &::placeholder {
    color: #a0969638;
    font-weight: lighter;
  }
`;

const TodoList = styled.ul``;

const Todo = () => {
  const {
    value,
    todos,
    filter,
    handleInputChange,
    handleToggleIsDone,
    handleCreateTodo,
    handleDeleteTodo,
    handleUpdateTodo,
    handleClearComplete,
    handleChangeFilter
  } = useTodo();

  return (
    <TodoWrapper>
      <GlobalStyle />
      <TodoTitle>
        todos
      </TodoTitle>
      <TodoBody>
        <TodoInput 
          placeholder='What needs to be done?' 
          value={value} 
          onChange={handleInputChange} 
          onKeyDown={e => { 
            if (e.keyCode === 13 && value !== '') {
            handleCreateTodo(e);
          }}}
        />
        <TodoList>
          { 
            todos.filter(todo => {
              if (filter === 'all') return todo
              return filter === 'complete' ? todo.isDone : !todo.isDone
            }).map(todo => <TodoItems 
            key={todo.id} 
            todo={todo} 
            handleDeleteTodo={handleDeleteTodo}
            handleToggleIsDone={handleToggleIsDone}
            handleUpdateTodo={handleUpdateTodo} 
            />
          )}
        </TodoList>
        <TodoFooter
          todos={todos}
          handleChangeFilter={handleChangeFilter}
          handleClearComplete={handleClearComplete}
        />
      </TodoBody>
    </TodoWrapper>
  )
}

export default Todo;