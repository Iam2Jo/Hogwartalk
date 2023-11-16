import { useRecoilState, useSetRecoilState } from 'recoil';
import { StyledImage } from './Icon.styles';
import { audioState } from '@recoil/atom';
import DisBgmIcon from './DisBgmIcon';
import { useRef } from 'react';

const BgmIcon = () => {
  const play = useRecoilState(audioState);
  const setPlay = useSetRecoilState(audioState);

  return (
    <StyledImage
      src="/assets/icons/bgm.svg"
      alt="Bgm"
      width="15"
      height="15"
      onClick={() => {
        setPlay(!play[0]);
        console.log(play);
      }}
    />
  );
};

export default BgmIcon;
