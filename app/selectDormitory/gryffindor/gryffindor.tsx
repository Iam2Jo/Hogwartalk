'use client';
import { useRecoilValue } from 'recoil';
import { gryffindorChatInfoState } from '@recoil/dormChatInfo';
import { Dormitory } from '@components/Dormitory';

const Gryffindor = () => {
  const { id } = useRecoilValue(gryffindorChatInfoState);

  return <Dormitory chatId={id} />;
};

export default Gryffindor;
