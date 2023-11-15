'use client';
import styled from 'styled-components';

export const LoginContainer = styled.div`
  padding-top: 7rem;
  width: 100vw;
  height: 100vh;
  background-image: url('/loginBackimg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
`;
export const LoginFormStyle = styled.div`
  position: relative;

  label {
    color: #ffffff;
    font-size: 18px;
  }
  .form__input {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
  }
  input {
    background: transparent;
    border: none;
    border-bottom: 0.1px solid #4e4e4e;
    color: #ffffff;
      outline: none;
    height: 2.62rem;
  }
  button {
    width: 254px;
    height: 48px;
    background-color: inherit;
    color: #ffffff;
    border: none;
    border: 0.1px solid #4e4e4e;
    margin-left: 15rem;
    cursor: pointer;
    &:hover {
      background-color: var(--color-main-yellow);
      color: #000;
      box-shadow: 0px 0px 20px 0px rgba(242, 204, 0, 0.49);
    }
  }
  .footer {
    display: flex;
    gap: 1rem;
    flex-direction: column;
  }
`;
