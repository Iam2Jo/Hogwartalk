import type { NextPage } from 'next';
import Slytherin from './slytherin';
import { MyChatting } from '@components/MyChatting';
import { Header } from '@components/Header';

const DormSlytherin: NextPage = () => {
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
        <Slytherin />
      </div>
    </>
  );
};

export default DormSlytherin;
