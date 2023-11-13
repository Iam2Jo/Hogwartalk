import styled from 'styled-components';

export const SignupContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url('/loginBackimg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  display: flex;
  flex-direction: row;
  /* justify-content: center; */
  align-items: center;
  img {
    width: 180px;
    height: 100px;
    position: absolute;
    left: 20px;
    top: 0px;
  }
  form {
    position: relative;
    left : 30%;
  }
  label {
    font-size: 18px;
    color: #ffffff;
  }
  .form__input {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
  }
  input {
    background-color: inherit;
    border: none;
    border-bottom: 0.1px solid white;
    color: #ffffff;
  }
  button {
    width: 254px;
    height: 48px;
    background-color: inherit;
    color: #ffffff;
  }
`;
