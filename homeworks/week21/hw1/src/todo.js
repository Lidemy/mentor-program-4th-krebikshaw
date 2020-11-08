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

const writeTodosToLocalStorage = ( todos, calc ) => {
  window.localStorage.setItem('todos', JSON.stringify(todos));
  window.localStorage.setItem('calc', JSON.stringify(calc));
}

let todoId = 1;
let TodoData = window.localStorage.getItem('todos') || '';
let CalcData = window.localStorage.getItem('calc') || '';

const Todo = () => {
  const [value, setValue] = useState('');
  const [todos, setTodos] = useState(() => {
    if (TodoData) {
      TodoData = JSON.parse(TodoData);
      todoId = TodoData[TodoData.length - 1].id + 1;
    } else {
      TodoData = [{
        id: 0,
        content: 'new todo',
        isDone: false,
        isShow: true
      }]
    }
    return TodoData;
  })
  const [calc, setCalc] = useState(() => {
    if (CalcData) {
      CalcData = JSON.parse(CalcData);
    } else {
      CalcData = {
        all: 1,
        active: 1,
        complete: 0
      }
    }
    return CalcData;
  });

  useEffect(() => {
    writeTodosToLocalStorage(todos, calc);
  }, [todos, calc])

  useEffect(() => {
    let all = 0, active = 0, complete = 0;
    for (let i = 0; i < todos.length; i++) {
      all++
      if (todos[i].isDone) complete++;
      if (!todos[i].isDone) active++;
    }
    setCalc({
      all,
      active,
      complete
    })
  }, [todos])

  const handleInputChange = e => {
    setValue(e.target.value)
  }
  const handleCreateTodo = e => {
    if (e.keyCode === 13 && value !== '') {
      setTodos([...todos, {
        id: todoId,
        content: value,
        isDone: false,
        isShow: true
      }])
      setValue('')
      todoId ++
    }
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

  const handleChangeFilt = value => {
    if ( value === 'all' ) {
      setTodos(todos.map(todo => {
        return {
          ...todo,
          isShow: true
        }
      }))
    };
    if ( value === 'active' ) {
      setTodos(todos.map(todo => {
        if (todo.isDone === true) {
          return {
            ...todo,
            isShow: false
          }
        } return {
          ...todo,
          isShow: true
        }
      }))
    };
    if ( value === 'complete' ) {
      setTodos(todos.map(todo => {
        if (todo.isDone === true) {
          return {
            ...todo,
            isShow: true
          }
        } return {
          ...todo,
          isShow: false
        }
      }))
    }
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
          onKeyDown={handleCreateTodo}
        />
        <TodoList>
          { todos.filter(todo => todo.isShow).map(todo => <TodoItems 
            key={todo.id} 
            todo={todo} 
            handleDeleteTodo={handleDeleteTodo}
            handleToggleIsDone={handleToggleIsDone}
            handleUpdateTodo={handleUpdateTodo} 
            />
          )}
        </TodoList>
        <TodoFooter 
          calc={calc}
          handleChangeFilt={handleChangeFilt}
          handleClearComplete={handleClearComplete}
        />
      </TodoBody>
    </TodoWrapper>
  )
}

export default Todo;