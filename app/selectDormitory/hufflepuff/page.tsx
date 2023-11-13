import type { NextPage } from 'next';
import Hufflepuff from './hufflepuff';
import { MyChatting } from '@components/MyChatting';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background-color: #1f1f1f;
`;

const DormHufflepuff: NextPage = () => {
  return (
    <Container>
      <MyChatting />
      <Hufflepuff />
    </Container>
  );
};

export default DormHufflepuff;
