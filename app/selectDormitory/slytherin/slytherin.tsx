'use client';
import { useRecoilValue } from 'recoil';
import { slytherinChatIdState } from '@recoil/dormChatId';
import { Dormitory } from '@components/Dormitory';

const Slytherin = () => {
  const slytherinChatId = useRecoilValue(slytherinChatIdState);

  return <Dormitory chatId={slytherinChatId} />;
};

export default Slytherin;
