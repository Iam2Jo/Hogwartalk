import type { NextPage } from 'next';
import React from 'react';
import Chatting from './chatting';
import { MyChatting } from '@components/MyChatting';

const ClubChatting: NextPage = () => {
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
      <Chatting />
    </div>
  );
};

export default ClubChatting;
