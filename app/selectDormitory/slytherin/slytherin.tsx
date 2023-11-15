'use client';

import { useState, useEffect } from 'react';
import { Dormitory } from '@components/Dormitory';
import { getFirebaseData } from '@hooks/useFireFetch';

const Slytherin = () => {
  const [chatId, setChatId] = useState(null);
  const [name, setName] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const firebaseId = await getFirebaseData('chatInfo', 'slytherin', 'id');
      const firebaseName = await getFirebaseData(
        'chatInfo',
        'slytherin',
        'name',
      );
      setChatId(firebaseId);
      setName(firebaseName);
    };
    fetchData();
  }, []);

  if (!chatId || !name) {
    return <div>로딩중...</div>;
  }

  return <Dormitory chatId={chatId} dormName={name} />;
};

export default Slytherin;
