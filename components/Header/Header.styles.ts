import styled from 'styled-components';

const flexCenter = `
  display: flex;
  align-items: center;
`;

export const HeaderWrapper = styled.header`
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

export const RightIcons = styled.div`
  ${flexCenter}
  & > *:not(:last-child) {
    margin-right: 16px;
  }
`;
