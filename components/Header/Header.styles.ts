import styled from 'styled-components';

const flexCenter = `
  display: flex;
  align-items: center;
`;

export const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #222;
  height: 50px;
  padding: 0 20px;
  ${flexCenter}
  justify-content: space-between;
`;

export const LeftIcons = styled.div`
  ${flexCenter}
  & > *:not(:last-child) {
    margin-right: 15px;
  }
`;

export const SearchIconWrapper = styled.div`
  margin-top: 5px;
`;

export const ChatIconWrapper = styled.div`
  margin-top: 5px;
`;

export const RightIcons = styled.div`
  ${flexCenter}
  & > *:not(:last-child) {
    margin-right: 16px;
  }
`;

export const MainButton = styled.div`
  color: #806c2a;

  &:hover {
    color: var(--color-main-yellow);
  }
`;
