'use client';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    font-family: "Noto Sans KR";
    line-height: 1.5;
    font-size: 16px;
    box-sizing: border-box;

  }

  #root {
    position: relative;
  }
  
  html {
    --color-main-yellow: #F2CC00;
    --color-main-black: #050505;
    --color-white: #ffffff;
    --color-gray: #050505;
    --color-disabled: #424242;
  }

  * {
    padding: 0;
    margin: 0;
    
  }

  body {    
    background-color: #222;
    
  }
  
  a {
    color: inherit;
    text-decoration: none;
    
  }
  
  div,
  li,
  section {
    box-sizing: border-box;

  }
  
  ul,
  li {
    list-style: none;
  }
  
  input {
    color: inherit;
    font-family: inherit;
  }  

  textarea {
    color: inherit;
    font-family: inherit;
  }

  ::-webkit-scrollbar {
    width: 0.5rem;
  }
  ::-webkit-scrollbar-thumb {
    background: var(--color-gray);
    border: 0;
    border-radius: 12px 12px 12px 12px;
  }

`;

export default GlobalStyle;
