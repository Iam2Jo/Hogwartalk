'use client';

import { useState, useEffect } from 'react';
import { Dormitory } from '@components/Dormitory';
import { getFirebaseData } from '@hooks/useFireFetch';
import { useRouter } from 'next/navigation';
import { getRefreshToken } from '@utils/service';

const Ravenclaw = () => {
  const [chatId, setChatId] = useState(null);
  const [name, setName] = useState(null);

      // 로그인되어있지 않다면 로그인페이지 유도
      const router = useRouter();
      useEffect(() => {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
          alert('로그인이 필요합니다.');
          router.push('/');
        }
      }, []);

  useEffect(() => {
    const fetchData = async () => {
      const firebaseId = await getFirebaseData('chatInfo', 'ravenclaw', 'id');
      const firebaseName = await getFirebaseData(
        'chatInfo',
        'ravenclaw',
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

export default Ravenclaw;
