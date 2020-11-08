import React from 'react';
import ReactDOM from 'react-dom';
import Todo from './todo';
import { ThemeProvider } from 'styled-components';

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
    <Todo />
  </ThemeProvider>
  ,
  document.getElementById('root')
);