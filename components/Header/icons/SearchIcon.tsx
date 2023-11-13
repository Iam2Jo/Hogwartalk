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

const SearchIcon: React.FC<SearchIconProps> = ({ onClick, isToggled }) => {
  return (
    <IconContainer onClick={onClick} $isToggled={isToggled}>
      <img
        src="/assets/icons/search.svg"
        alt="My Page"
        width="17"
        height="17"
      />
    </IconContainer>
  );
};

export default SearchIcon;
