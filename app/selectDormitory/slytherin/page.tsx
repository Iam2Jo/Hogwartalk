import type { NextPage } from 'next';
import Slytherin from './slytherin';
import { MyChatting } from '@components/MyChatting';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background-color: #1f1f1f;
`;

const DormSlytherin: NextPage = () => {
  return (
    <Container>
      <MyChatting />
      <Slytherin />
    </Container>
  );
};

export default DormSlytherin;
