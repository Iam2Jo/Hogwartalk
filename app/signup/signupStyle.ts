import styled from 'styled-components';

export const SignupContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url('/loginBackimg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  .LoginTitle {
    width: 11.2rem;
    height: 5.72rem;
    margin: 1.25rem 1rem 0 1.88rem;
    position: absolute;
    top: 0px;
    left: 0px;
  }
  form {
    position: relative;
    display: flex;
    margin-top: 3rem;
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
    width: 500px;
    background-color: inherit;
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
  }
  .profile__img {
    margin: 6rem 0 0 2rem;
    width: 15rem;
    height: 15rem;
    object-fit: cover;
    border-radius: 50%;
    background-color: #ffffff;
  }
  .button__test {
    width: 225px;
    height: 48px;
    background-color: inherit;
    color: #ffffff;
    border: none;
    border: 0.1px solid #4e4e4e;
    margin-left: 1rem;
    cursor: pointer;
    &:hover {
      background-color: var(--color-main-yellow);
      color: #000;
      box-shadow: 0px 0px 20px 0px rgba(242, 204, 0, 0.49);
    }
  }

  .input__test {
    width: 260px;
  }

  .button__submit {
    margin-top: 3rem;
    width: 254px;
    height: 48px;
    background-color: inherit;
    color: #ffffff;
    border: none;
    border: 0.1px solid #4e4e4e;
    cursor: pointer;
    &:hover {
      background-color: var(--color-main-yellow);
      color: #000;
      box-shadow: 0px 0px 20px 0px rgba(242, 204, 0, 0.49);
    }
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
    top: 18rem;
    right: 6rem;
    border-radius: 50%;
    background-color: white;
    color: black;
    z-index: 3;
    cursor: pointer;
    &:hover {
      background-color: var(--color-main-yellow);
      color: #000;
      box-shadow: 0px 0px 20px 0px rgba(242, 204, 0, 0.49);
    }
  }
`;
