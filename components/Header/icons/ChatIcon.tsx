import { StyledImage } from './Icon.styles';
import React from 'react';
import styled, { css } from 'styled-components';
import { commonIconStyles } from './Icon.styles';

interface SearchIconProps {
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

const ChatIcon: React.FC<SearchIconProps> = ({ onClick, isToggled }) => {
  return (
    <IconContainer onClick={onClick} $isToggled={isToggled}>
      <StyledImage
        src="/assets/icons/chat.svg"
        alt="Chat"
        width="18"
        height="18"
      />
    </IconContainer>
  );
};

export default ChatIcon;
