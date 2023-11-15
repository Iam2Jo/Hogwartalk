import styled from 'styled-components';

export const Background = styled.div`
  z-index: 1;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 50%;
`;

export const Container = styled.div`
  width: 35.75rem;
  height: 20.125rem;

  z-index: 999;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  border-radius: 0.3125rem;
  background: rgba(3, 3, 3, 1);
  color: var(--color-white);
`;

export const CancelIcon = styled.button`
  background-color: transparent;
  border: 0;
  margin: 2.81rem 3.69rem 0 30.72rem;
  cursor: pointer;
`;

export const Content = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Title = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
`;

export const Desc = styled.span`
  font-size: 1.5rem;
`;

export const JoinBtn = styled.button`
  margin-top: 2.5rem;
  width: 15.875rem;
  height: 3rem;
  background-color: #000;
  color: #fff;
  border: 1px solid var(--color-main-yellow);
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: var(--color-main-yellow);
    color: #000;
    box-shadow: 0px 0px 20px 0px rgba(242, 204, 0, 0.49);
  }
`;
