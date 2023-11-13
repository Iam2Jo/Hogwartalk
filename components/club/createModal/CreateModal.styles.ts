import styled from 'styled-components';

export const Container = styled.div`
  width: 50.75rem;
  height: 33.125rem;

  z-index: 999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  border-radius: 0.3125rem;
  background: rgba(3, 3, 3, 1);
  color: var(--color-white);
`;

export const Header = styled.div`
  margin: 2.81rem 3.69rem 0 3.69rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.span`
  font-size: 1.5rem;
  font-weight: 500;
`;

export const CancelIcon = styled.button`
  background-color: transparent;
  border: 0;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SetWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3.81rem 3.69rem 0 3.69rem;
`;

export const SetTitle = styled.p`
  font-size: 1.125rem;
  font-weight: 500;
`;

export const SetTitleInput = styled.input`
  height: 2.62rem;
  border: none;
  border-bottom: 1px solid #4e4e4e;
  background: transparent;
  outline: none;
  margin-top: 0.3rem;
`;

export const InputWrap = styled.div`
  margin-top: 1.3rem;
  display: flex;
  gap: 1rem;
`;

export const SetPrivateInput = styled.input`
  margin: 0.5rem;
`;

export const AddBtn = styled.button`
  position: absolute;
  bottom: 13%;
  right: 7%;
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
