import React from "react";
import styled from "styled-components";

const FooterContainer = styled.div`
  height: 80px;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  & p {
    color: ${props => props.theme.colors.primary};
    font-size: ${props => props.theme.font_size.text};
    text-shadow: 0 0 15px rgba(0,0,0,0.5);
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>Design by krebikshaw</p>
    </FooterContainer>
  )
}

export default Footer;