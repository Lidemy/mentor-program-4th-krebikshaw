import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GlobalStyle from './../constants/style';
import Crosses from './Crosses';

const BoardWrapper = styled.div`
  position: relative;
  left: 2%;
  width: 558px;
  display: flex;
  flex-wrap: wrap;
  z-index: 5;
  &::before {
    content: "";
    position: absolute;
    left: 0px;
    top: 0px;
    right: 25px;
    bottom: -1px;
    border: 14px solid ${props => props.theme.colors.cross_line};
  }
`;

const Board = ( { board, handleClick } ) => {
  return (
    <BoardWrapper>
      {
        board.map((row, index_y) => row.map((item, index_x) => <Crosses
          key={index_x}
          value={item}
          handleClick={() => handleClick(index_x, index_y)}
        />))
      }
    </BoardWrapper>
  )
};

export default Board;