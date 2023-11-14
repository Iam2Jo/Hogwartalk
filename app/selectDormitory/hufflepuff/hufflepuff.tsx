'use client';
import { useRecoilValue } from 'recoil';
import { hufflepuffChatInfoState } from '@recoil/dormChatInfo';
import { Dormitory } from '@components/Dormitory';

const Hufflepuff = () => {
  const { id, name } = useRecoilValue(hufflepuffChatInfoState);

  return <Dormitory chatId={id} dormName={name} />;
};

export default Hufflepuff;
