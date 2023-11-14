import styled from 'styled-components';

const LoginContainer = styled.div`
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
const LoginFormStyle = styled.div`
position: relative;

  label {
    color: #ffffff;
    font-size : 18px;
    
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
LoginContainer.displayName = 'LoginContainer';
LoginFormStyle.displayName = 'LoginFormStyle';
export {LoginContainer,LoginFormStyle}
