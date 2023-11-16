import type { NextPage } from 'next';
import Hufflepuff from './hufflepuff';
import { MyChatting } from '@components/MyChatting';
import { Header } from '@components/Header';

const DormHufflepuff: NextPage = () => {
  return (
    <>
      <Header />
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          padding: '1rem',
          backgroundColor: '#1f1f1f',
          height: '100vh',
        }}
      >
        <MyChatting />
        <Hufflepuff />
      </div>
    </>
  );
};

export default DormHufflepuff;
