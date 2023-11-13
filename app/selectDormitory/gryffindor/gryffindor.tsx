'use client';
import { useRecoilValue } from 'recoil';
import { gryffindorChatInfoState } from '@recoil/dormChatInfo';
import { Dormitory } from '@components/Dormitory';

const Gryffindor = () => {
  const { id, name } = useRecoilValue(gryffindorChatInfoState);

  return <Dormitory chatId={id} dormName={name} />;
};

export default Gryffindor;
