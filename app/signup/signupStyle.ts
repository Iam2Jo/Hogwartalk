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
  .LoginTitile {
    width: 180px;
    height: 100px;
    position: absolute;
    left: 20px;
    top: 0px;
  }
  form {
    position: relative;
    left: 20%;
    display: flex;
  }
  label {
    font-size: 18px;
    color: #ffffff;
  }
  .form__input {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
    margin-right: 80px;
  }
  input {
    width: 350px;
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
  .profile__img {
    width: 15rem;
    height: 15rem;
    object-fit: cover;
    border-radius: 50%;
    background-color: #ffffff;
  }
  .button__test {
    width: 154px;
    height: 38px;
    position: relative;
  }

  .input__test {
    width: 180px;
    margin-right: 20px;
  }

  .button__submit {
    margin-top: 20px;
  }
  #picture {
    display: none;
  }

 .button__save__img {
    width: 4rem;
      height: 4rem;
      object-fit: cover;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 12rem;
      right: 6rem;
      border-radius: 50%;
      background-color: white;
      color :black;
      z-index: 3;

  }
`;
