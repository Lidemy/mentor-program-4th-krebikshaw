import React from 'react';
import ReactDOM from 'react-dom';
import Todo from './todo';
import store from './redux/store';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';

const theme = {
  colors: {
    title_primary: 'rgba(175, 47, 47, 0.15)',
    text_primary: '#4d4d4d'
  },
  bg_colors: {
    bg_primary: '#fff'
  },
  font_size: {
    title: '6rem',
    text: '1.4rem',
    input: '1.5rem'
  },
};

ReactDOM.render(
  <ThemeProvider theme={ theme }>
    <Provider store={store}>
      <Todo />
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);

