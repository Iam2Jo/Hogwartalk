import type { NextPage } from 'next';
import Ravenclaw from './ravenclaw';
import { MyChatting } from '@components/MyChatting';

const DormRavenclaw: NextPage = () => {
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
      <Ravenclaw />
    </div>
  );
};

export default DormRavenclaw;
