import React from "react";
import styled from "styled-components";

const AboutContainer = styled.div`
  padding: 0 100px;
`;

const Title = styled.h2`
  color: ${props => props.theme.colors.primary};
  letter-spacing: 0.1rem;
  font-size: ${props => props.theme.font_size.title};
  font-weight: normal;
  margin: 50px 0;
  text-align: center;
`;

const Content = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.font_size.text};
  margin-bottom: 5px;
  text-align: center;
`;

const About = () =>  {
  return (
    <AboutContainer>
      <Title>關於我</Title>
      <Content>
        2020 年 6 月 開始踏入前端的學習之路，這個部落格是在學習第 22 週的時候，利用 React 實現 SPA 的練習網站。
        實作過程中，除了翻閱筆記之外，還參考了很多貓咪影片。遇到 bug 的時候，我都是坐時光機去古代找答案再回來改的唷。
        噢！對了～ 本網站因為比較有個性，所以跟它互動要多一點耐心，別跟它一般見識。那我廢話不多說，大家當自己家「隨意逛逛」，我去嚕貓了！
      </Content>
    </AboutContainer>
  )
}

export default About;