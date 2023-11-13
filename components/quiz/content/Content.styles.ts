import styled, { keyframes } from 'styled-components';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const Logo = styled.div`
  width: 11.2rem;
  height: 5.72rem;
  margin: 1.25rem 0 0 1.88rem;
`;

export const HatImg = styled.div`
  width: 11.75rem;
  height: 10.375rem;
  margin-bottom: 3.12rem;
  filter: drop-shadow(2px 15px 15px rgb(0, 0, 0, 0.8));
  animation: motion 0.6s linear 0s infinite alternate;
  margin-top: 0;

  @keyframes motion {
    0% {
      margin-left: 0;
    }
    100% {
      margin-right: 1rem;
    }
  }
`;
