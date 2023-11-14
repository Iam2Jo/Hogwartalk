import styled from 'styled-components';
import Image from 'next/image';

export const Background = styled.div`
  z-index: 900;
  width: 100%;
  height: 100%;
  background-color: #000;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const LoadingWrap = styled.div`
  z-index: 999;
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Title = styled.p`
  text-align: center;
  color: #fff;
`;

export const Loading = styled.div``;
