import type { NextPage } from 'next';
import Gryffindor from './gryffindor';
import { MyChatting } from '@components/MyChatting';

const DormGryffindor: NextPage = () => {
  return (
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
  );
};

export default DormGryffindor;
