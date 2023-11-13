import styled from 'styled-components';
import Gryffindor from '@assets/img/Gryffindor.svg';
import Slytherin from '@assets/img/Slytherin.svg';
import Hufflepuff from '@assets/img/Hufflepuff.svg';
import Ravenclaw from '@assets/img/Ravenclaw.svg';
import Club from '@assets/img/Club.svg';

export const GryffindorSVG = styled(Gryffindor)``;
export const SlytherinSVG = styled(Slytherin)``;
export const HufflepuffSVG = styled(Hufflepuff)``;
export const RavenclawSVG = styled(Ravenclaw)``;
export const ClubSVG = styled(Club)``;

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Wrapper = styled.div`
  width: 50%;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
`;

export const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const CenterSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
