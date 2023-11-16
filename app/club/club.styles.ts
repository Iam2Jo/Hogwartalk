import styled from 'styled-components';

export const ContentWrap = styled.div`
  margin-top: 50px;
`;

export const Candle = styled.div`
width: 100%;
`

export const Container = styled.div`
  margin: 0.3rem 6.38rem 3.81rem 6.38rem;
`;

export const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.56rem;
`;
export const Title = styled.p`
  color: #cbaa00;
  font-size: 2.25rem;
  font-weight: 500;
  letter-spacing: -0.1125rem;
`;
export const AddChatBtn = styled.button`
  border: 0;
  background-color: transparent;
  color: #cbaa00;
  font-size: 2.25rem;
  font-style: normal;
  font-weight: 500;
  letter-spacing: -0.1125rem;
  cursor: pointer;
  transition: 1s;
  &:hover {
    color: rgba(242, 204, 0);
    text-shadow: 0px 0px 20px 0px rgba(242, 204, 0, 0.49);
  }
`;

export const ChatList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(18.125rem, 1fr));
  grid-gap: 1rem;
  justify-content: space-between;
  place-items: center;
`;
