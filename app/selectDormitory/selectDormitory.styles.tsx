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

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const CenterSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
