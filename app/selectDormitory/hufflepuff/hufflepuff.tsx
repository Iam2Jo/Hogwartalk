'use client';
import { useRecoilValue } from 'recoil';
import { hufflepuffChatIdState } from '@recoil/dormChatId';
import { Dormitory } from '@components/Dormitory';

const Hufflepuff = () => {
  const hufflepuffChatId = useRecoilValue(hufflepuffChatIdState);

  return <Dormitory chatId={hufflepuffChatId} />;
};

export default Hufflepuff;
