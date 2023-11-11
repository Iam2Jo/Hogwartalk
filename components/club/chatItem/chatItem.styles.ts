import styled from 'styled-components';

export const Container = styled.div`
  color: var(--color-white);
  width: 18.125rem;
  height: 9.375rem;
  border-radius: 0.9375rem;
  border: 1px solid #4e4e4e;
  background: #191919;

  &:hover {
    border-radius: 0.9375rem;
    border: 1px solid #f2cc00;
    background: #191919;
    color: var(--color-main-yellow);
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.p`
  margin: 1.44rem 1.75rem 1.44rem 1.75rem;
  font-weight: 500;
`;

export const BottomWrap = styled.div`
  display: flex;
  margin: 1.44rem 1.75rem 1.44rem 1.75rem;
  justify-content: space-between;
`;

export const Badge = styled.div`
  border-radius: 6.25rem;
  background: #f2cc00;
  width: 4.1875rem;
  height: 1.8125rem;
  color: #000;
  text-align: center;
  font-weight: 500;
`;
export const UserInfoWrap = styled.div``;
export const UserIcon = styled.div``;
export const UserCount = styled.span`
  font-weight: 500;
`;
export const UserMaximum = styled.span``;
