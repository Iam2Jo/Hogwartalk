'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Dormitory } from '@components/Dormitory';
import { getFirebaseData } from '@hooks/useFireFetch';
import { set } from 'lodash';

const ClubChatting = () => {
  const params = useSearchParams();
  // const queryString = params.get('id');

  // const id = queryString.split('&name=')[0];
  // const name = queryString.split('&name=')[1];

  const id = params.get('id');
  const name = params.get('name');

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
