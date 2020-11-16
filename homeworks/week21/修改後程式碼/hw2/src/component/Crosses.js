import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GlobalStyle from './../constants/style';

const Cell = styled.div`
  position: relative;
  display: flex;
  height: 28px;
  width: 28px;
  z-index: 10;
  ${
    props => !props.$type && `
      cursor: pointer;
      &:hover {
        background:radial-gradient(circle closest-side at center,#f7fdff,rgba(0,0,0,0));
      }
    ` 
  }
  ${
    props => props.$type === 'black' && `
      background: url(black-circle.svg) center/cover no-repeat;
      background-size: 20px 20px;
    `
  }
  ${
    props => props.$type === 'white' && `
      background: url(white-circle.svg) center/cover no-repeat;
      background-size: 20px 20px;
    `
  }
`;

const Cross = styled.div`
  ${
    props => props.$show  && `
      width: 15px; 
      height: 15px;
      box-shadow: 2px 2px 0px 0 ${props.theme.colors.cross_line};
      position: absolute;
      left: -6%;
      top: -6%;
      z-index: 5;
      &::after {
        content: "";
        width: 15px; 
        height: 15px;
        box-shadow: -2px -2px 0 0 ${props.theme.colors.cross_line};
        position: absolute;
        z-index: 5;
        left: 112%;
        top: 114%;
      }
    ` 
  }
`;

const Crosses = ({ value, handleClick }) => {
  const [show, setShow] = useState(true)
  const handleClicked = () => {
    if ( !show ) return
    handleClick();
  }
  const handleSwitch = () => {
    setShow(false)
  }

  return (
    <Cell
      $type={value}
      onClick={() => {
        handleClicked()
        handleSwitch()
      }}
    >
      <Cross $show={show} />
    </Cell>
  )
};

export default Crosses;