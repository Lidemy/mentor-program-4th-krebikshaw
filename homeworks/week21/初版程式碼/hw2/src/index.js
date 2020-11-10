import React from 'react';
import ReactDOM from 'react-dom';
import Gobang from './Gobang'
import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    title_primary: '',
    text_primary: '',
    cross_line: '#525151'
  },
  bg_colors: {
    bg_primary: '#f2fffb'
  },
  font_size: {
    title: '3rem',
    text: '1.4rem',
    input: '1.5rem'
  },
};

ReactDOM.render(
  <ThemeProvider theme={ theme }>
    <Gobang />
  </ThemeProvider>,
  document.getElementById('root')
);
