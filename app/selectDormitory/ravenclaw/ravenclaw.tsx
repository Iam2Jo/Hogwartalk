'use client';
import { useRecoilValue } from 'recoil';
import { ravenclawChatInfoState } from '@recoil/dormChatInfo';
import { Dormitory } from '@components/Dormitory';

const Ravenclaw = () => {
  const { id, name } = useRecoilValue(ravenclawChatInfoState);

  return <Dormitory chatId={id} dormName={name} />;
};

export default Ravenclaw;
