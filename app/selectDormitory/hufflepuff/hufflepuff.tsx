'use client';
import { useRecoilValue } from 'recoil';
import { hufflepuffChatInfoState } from '@recoil/dormChatInfo';
import { Dormitory } from '@components/Dormitory';

const Hufflepuff = () => {
  const { id } = useRecoilValue(hufflepuffChatInfoState);

  return <Dormitory chatId={id} />;
};

export default Hufflepuff;
