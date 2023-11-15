import { audioState } from '@recoil/atom';
import React, { useEffect, useRef } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import MyAudio from '@assets/bgm/MyAudio.mp3';

const bgmPlayer = () => {
  const myRef = useRef<HTMLAudioElement>(null);
  const play = useRecoilState(audioState);
  useEffect(() => {
    if (play[0] === true) {
      myRef.current.play();
    } else myRef.current.pause();
  }, [play]);

  return <audio ref={myRef} src={MyAudio} loop autoPlay={true}></audio>;
};

export default bgmPlayer;
