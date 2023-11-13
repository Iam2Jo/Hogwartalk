'use client';
import { useRecoilValue } from 'recoil';
import { ravenclawChatIdState } from '@recoil/dormChatId';
import { Dormitory } from '@components/Dormitory';

const Ravenclaw = () => {
  const ravenclawChatId = useRecoilValue(ravenclawChatIdState);

  return <Dormitory chatId={ravenclawChatId} />;
};

export default Ravenclaw;
