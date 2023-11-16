'use client';

import { Dormitory } from '@components/Dormitory';

const ClubChatting = (id: any, name: any) => {
  if (!id || !name) {
    return <div style={{ backgroundColor: 'white' }}>로딩중...</div>;
  }

  return <Dormitory chatId={id} dormName={name} />;
};

export default ClubChatting;
