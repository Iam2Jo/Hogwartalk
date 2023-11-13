import styled from 'styled-components';

export const Modal = styled.div`
  width: 100%;
  height: 100%;

  z-index: 9999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background: rgba(0, 0, 0, 0.9);
  color: var(--color-white);
`;

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Img = styled.div`
  width: 22.25rem;
  height: 27rem;
  filter: drop-shadow(8px 12px 12px rgb(242, 204, 0, 0.3));
`;

export const Title = styled.span`
  font-size: 1.5625rem;
  font-weight: bold;
`;

export const Text = styled.p`
  font-size: 1.5625rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const NextBtn = styled.button`
  margin-top: 2.5rem;
  width: 15.875rem;
  height: 3rem;
  background-color: #000;
  color: #fff;
  border: 1px solid var(--color-main-yellow);
  cursor: pointer;

  &:hover {
    background-color: var(--color-main-yellow);
    color: #000;
    box-shadow: 0px 0px 20px 0px rgba(242, 204, 0, 0.49);
  }
`;
