'use client';
import { useRecoilValue } from 'recoil';
import { gryffindorChatInfoState } from '@recoil/dormChatInfo';
import { Dormitory } from '@components/Dormitory';

const Slytherin = () => {
  const { id } = useRecoilValue(gryffindorChatInfoState);

  return <Dormitory chatId={id} />;
};

export default Slytherin;
