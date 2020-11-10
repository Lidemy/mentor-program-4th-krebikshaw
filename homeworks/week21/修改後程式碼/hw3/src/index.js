import React from 'react';
import ReactDOM from 'react-dom';
import GoogleForm from './formPage'
import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    text_primary: '#4d4d4d',
    error_message: '#d93025'
  },
  bg_colors: {
    bg_primary: '#e2f3ce'
  },
  font_size: {
    header: '2rem',
    text: '0.4rem',
    title: '1rem'
  },
};

ReactDOM.render(
  <ThemeProvider theme={ theme }>
    <GoogleForm />
  </ThemeProvider>,
  document.getElementById('root')
);
