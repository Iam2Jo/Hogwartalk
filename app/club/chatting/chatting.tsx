'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Dormitory } from '@components/Dormitory';
import { getFirebaseData } from '@hooks/useFireFetch';

const ClubChatting = () => {
  const params = useSearchParams();
  const queryString = params.get('id');

  const id = queryString.split('?name=')[0];
  const name = queryString.split('?name=')[1];

  useEffect(() => {
    console.log('id', id);
    console.log('name', name);
  }, [id, name]);

  if (!id || !name) {
    return <div style={{ backgroundColor: 'white' }}>로딩중...</div>;
  }

  return <Dormitory chatId={id} dormName={name} />;
};
export default ClubChatting;
