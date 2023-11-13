import type { NextPage } from 'next';
import Gryffindor from './gryffindor';
import { MyChatting } from '@components/MyChatting';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background-color: #1f1f1f;
`;

const DormGryffindor: NextPage = () => {
  return (
    <Container>
      <MyChatting />
      <Gryffindor />
    </Container>
  );
};

export default DormGryffindor;
