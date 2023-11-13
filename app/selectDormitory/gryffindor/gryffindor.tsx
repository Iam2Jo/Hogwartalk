'use client';
import { useRecoilValue } from 'recoil';
import { gryffindorChatIdState } from '@recoil/dormChatId';
import { Dormitory } from '@components/Dormitory';

const Gryffindor = () => {
  const gryffindorChatId = useRecoilValue(gryffindorChatIdState);

  return <Dormitory chatId={gryffindorChatId} />;
};

export default Gryffindor;
