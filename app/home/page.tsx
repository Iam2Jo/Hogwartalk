import type { NextPage } from 'next';
import { Header } from '@/components/Header';
import BgmPlayer from '@components/BgmPlayer/bgmPlayer';

const home: NextPage = () => {
  return (
    <div>
      <BgmPlayer />
    </div>
  );
};

export default home;
