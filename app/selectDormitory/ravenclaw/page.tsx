import type { NextPage } from 'next';
import Ravenclaw from './ravenclaw';
import { MyChatting } from '@components/MyChatting';
import { Header } from '@components/Header';

const DormRavenclaw: NextPage = () => {
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
        <Ravenclaw />
      </div>
    </>
  );
};

export default DormRavenclaw;
