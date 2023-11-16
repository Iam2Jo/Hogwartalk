import React, { useEffect } from 'react';
import { Dormitory } from '@components/Dormitory';
import { MyChatting } from '@components/MyChatting';
import { Header } from '@components/Header';

export default function ClubChatting(props: any) {
  const decodeURL = decodeURIComponent(props.params.id);
  const id = decodeURL.split('&name=')[0];
  const name = decodeURL.split('&name=')[1];
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
        <Dormitory chatId={id} dormName={name} />
      </div>
    </>
  );
}
