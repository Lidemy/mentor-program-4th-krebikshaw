import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GlobalStyle from './constants/style';
import Form from './form';

const Wrapper = styled.div`
  background: ${props => props.theme.bg_colors.bg_primary};
  font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
`;

const Banner = styled.header`
  background: url(https://lh4.googleusercontent.com/sAvtic6WzLRcGC485d2irc6Q36VS9GaiIj2TjL9AkbD1t3RjwacfNkJmmUe9fh9c0WV-ZVKQcw=w1200) center/cover no-repeat;
  height: 270px;
`;

const Main = styled.div`
  background: #ffffff;
  max-width: 640px;
  padding: 15px;
  margin: -100px auto 50px auto;
  border-top: 8px solid rgba(255, 137, 75);
  box-shadow: 0 1px 4px 0 rgba(0,0,0,0.37);
`;

const Summary = styled.section`
  padding: 0 20px;
  & h1 {
    font-size: ${props => props.theme.font_size.header};
    font-weight: bolder;
    margin: 30px 0;
  }
  & p {
    font-size: ${props => props.theme.font_size.text};
  }
  & .summary_strong {
    color: ${props => props.theme.colors.error_message};
    margin: 15px 0 20px 0;
  }
`;

const Footer = styled.footer`
  height: 50px;
  padding: 20px 30px;
  background: #50a9a0;
  display: flex;
  align-items: center;
  & p {
    position: relative;
    font-size: 12px;
    color: #ffffff;
    margin: 0 auto;
  }
`;

const GoogleForm = () => {
  return (
    <Wrapper>
      <GlobalStyle />
      <Banner></Banner>
      <Main>
        <Summary>
          <h1>新拖延病患治療紀錄表</h1>
          <p>治療日期：2020/12/10 ~ 2020/12/11</p>
          <p>治療地點：台北市大安區新生南路二段1號</p>
          <p className='summary_strong'>*必填</p>
        </Summary>
        <Form />
      </Main>
      <Footer className="footer">
        <p>請正視拖延問題，有症狀須立即治療</p>
      </Footer>
    </Wrapper>
  )
};

export default GoogleForm;