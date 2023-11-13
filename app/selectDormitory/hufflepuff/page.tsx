import type { NextPage } from 'next';
import Hufflepuff from './hufflepuff';
import { MyChatting } from '@components/MyChatting';

const DormHufflepuff: NextPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        padding: '1rem',
        backgroundColor: '#1f1f1f',
      }}
    >
      <MyChatting />
      <Hufflepuff />
    </div>
  );
};

export default DormHufflepuff;
