import type { NextPage } from 'next';
import Gryffindor from './gryffindor';
import MyChatting from './myChatting';

const DormGryffindor: NextPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        padding: '1rem',
        overflowY: 'hidden',
      }}
    >
      <MyChatting />
      <Gryffindor />
    </div>
  );
};

export default DormGryffindor;
