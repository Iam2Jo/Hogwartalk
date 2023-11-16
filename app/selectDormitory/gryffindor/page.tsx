import type { NextPage } from 'next';
import Gryffindor from './gryffindor';
import { MyChatting } from '@components/MyChatting';
import { Header } from '@components/Header';

const DormGryffindor: NextPage = () => {
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
        <Gryffindor />
      </div>
    </>
  );
};

export default DormGryffindor;
