import React from 'react';
import styled, { css } from 'styled-components';
import { commonIconStyles } from './Icon.styles';

interface MyPageIconProps {
  onClick: () => void;
  isToggled: boolean;
}

const IconContainer = styled.div<{ $isToggled: boolean }>`
  ${commonIconStyles}

  ${({ $isToggled }) =>
    $isToggled &&
    css`
      filter: sepia(89%) saturate(6054%) brightness(97%) contrast(113%);
    `}
`;

const MyPageIcon: React.FC<MyPageIconProps> = ({ onClick, isToggled }) => {
  return (
    <IconContainer onClick={onClick} $isToggled={isToggled}>
      <img
        src="/assets/icons/mypage.svg"
        alt="My Page"
        width="16"
        height="16"
      />
    </IconContainer>
  );
};

export default MyPageIcon;
