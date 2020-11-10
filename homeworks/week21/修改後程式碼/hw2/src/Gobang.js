import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GlobalStyle from './constants/style';
import Board from './component/Board'
import calculateWinner from './calculateWinner'

const Wrapper = styled.div`
  height: 100vh;
  padding: 15px 60px;
  display: flex;
  justify-content: center;
  background: ${props => props.theme.bg_colors.bg_primary};
  font-family: Fugaz One,cursive;
  & .flex {
    display: flex;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  margin: 35px 0;
`;

const TitleText = styled.h5`
  font-size: ${props => props.theme.font_size.title};
  font-weight: bolder;
`;

const BoardWrapper = styled.div`
  position: relative;
  max-height: 560px;
  max-width: 600px;
  display: flex;
  justify-content: flex-end;
  align-item: center;
  padding: 14px;
  border-radius: 10px;
  background: url(wood.jpg) center/cover no-repeat;
  box-shadow: 0 0 15px 3px rgba(0,0,0,0.5);
  &::after {
    position: absolute;
    content: "";
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: #e8e7e41f;
  }
`;

const Info = styled.div`
  padding: 90px 10px 10px 20px;
  & p {
    font-size: ${props => props.theme.font_size.text}
  }
`;

const FinishBg = styled.div`
  transition-duration: 6s;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #5d58587a;
  flex-direction: column;
  & p {
    color: #fff;
    font-size: 5rem;
    text-shadow: 0 0 90px rgba(0,0,0,1);
    z-index: 99;
    margin-bottom: 100px;
  }
  & button {
    height: 25px;
    width: 60px;
    margin-left: 12px;
    transition: background-color 0.1s ease-in-out, border-color 0.1s ease-in-out, color 0.1s ease-in-out;
    height: 2.75em;
    line-height: 2.75em;
    background-color: transparent;
    border-radius: 4px;
    border: solid 1px #fff;
    color: #fff !important;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    z-index: 99;
    &:hover {
      border-color: #0edef9;
      color: #0edef9 !important;
    }
  }
`;

const Gobang = () => {
  const [board, setBoard] = useState(() => {
    return Array(19).fill(Array(19).fill(null));
  });
  const [currentChess, setCurrentChess] = useState({
    color: 'black',
    index_x: 0,
    index_y: 0
  });

  const handleClick = (x, y) => {
    setBoard(() => board.map((row, index_y) => {
      if (index_y !== y) return row;
      return row.map((column, index_x) => {
        if (index_x !== x) return column;
        return currentChess.color;
      })
    }));
    setCurrentChess(() => {
      return {
        color: currentChess.color === 'black' ? 'white' : 'black',
        index_x: x,
        index_y: y
      }
    });
  }

  return (
    <Wrapper>
      <div class="flex">
        <GlobalStyle />
        <div>
          <Title>
            <TitleText>嘿嘿五子棋</TitleText>
          </Title>
          <BoardWrapper>
            <Board 
              board={board} 
              handleClick={handleClick}
            />
          </BoardWrapper>
        </div>
      </div>
      {
        calculateWinner(board, currentChess) && <FinishBg>
          <p>恭喜 {calculateWinner(board, currentChess) === 'black' ? '黑棋' : '白棋'} 獲勝！</p>
            <button onClick={() => {window.location.reload()}}>再玩一次</button>
        </FinishBg>
      }
    </Wrapper>
  );
};

export default Gobang;