import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GlobalStyle from './constants/style';
import TodoItems from './component/TodoItems';
import TodoFooter from './component/TodoFooter';

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

const writeTodosToLocalStorage = ( todos ) => {
  window.localStorage.setItem('todos', JSON.stringify(todos));
}

let todoId = 1;
let todoData = window.localStorage.getItem('todos') || '';

const Todo = () => {
  const [value, setValue] = useState('');
  const handleInputChange = e => {
    setValue(e.target.value)
  }

  const [filter, setFilter] = useState('all');
  const handleChangeFilter = value => {
    setFilter(value);
  }

  const [todos, setTodos] = useState(() => {
    if (todoData) {
      todoData = JSON.parse(todoData);
      todoId = todoData[todoData.length - 1].id + 1;
    } else {
      todoData = [{
        id: 0,
        content: 'new todo',
        isDone: false
      }]
    }
    return todoData;
  });

  const handleCreateTodo = e => {
    setTodos(() => {
      todoId++
      return [...todos, {
        id: todoId,
        content: value,
        isDone: false
      }];
    });
    setValue('');
    todoId++;
  }
  const handleDeleteTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id))
  }
  const handleToggleIsDone = id => {
    setTodos(todos.map(todo => {
      if (todo.id !== id) return todo
      return {
        ...todo,
        isDone: !todo.isDone
      }
    }))
  }
  const handleClearComplete = () => {
    setTodos(todos.filter(todo => !todo.isDone))
  }
  const handleUpdateTodo = (id, value) => {
    setTodos(todos.map(todo => {
      if (todo.id !== id) return todo
      return {
        ...todo,
        content: value
      }
    }))
  }

  useEffect(() => {
    writeTodosToLocalStorage(todos);
  }, [todos])

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
          { todos.filter(todo => {
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