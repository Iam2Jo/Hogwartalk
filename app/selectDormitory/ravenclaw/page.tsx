import type { NextPage } from 'next';
import Ravenclaw from './ravenclaw';
import { MyChatting } from '@components/MyChatting';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background-color: #1f1f1f;
`;

const DormRavenclaw: NextPage = () => {
  return (
    <Container>
      <MyChatting />
      <Ravenclaw />
    </Container>
  );
};

export default DormRavenclaw;
