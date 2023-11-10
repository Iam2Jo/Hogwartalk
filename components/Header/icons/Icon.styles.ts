import styled, { css } from 'styled-components';

export const commonIconStyles = css`
  cursor: pointer;
  transition: filter 0.1s;

  &:hover {
    filter: sepia(89%) saturate(6054%) brightness(97%) contrast(113%);
  }
`;

export const StyledImage = styled.img`
  ${commonIconStyles}
`;
