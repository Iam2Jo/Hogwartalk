import { useRecoilState, useSetRecoilState } from 'recoil';
import { StyledImage } from './Icon.styles';
import { audioState } from '@recoil/atom';
import { useRef } from 'react';

const DisBgmIcon = () => {
  const setPlay = useSetRecoilState(audioState);
  const play = useRecoilState(audioState);

  return (
    <StyledImage
      src="/assets/icons/Disbgm.svg"
      alt="DisBgm"
      width="15"
      height="15"
      onClick={() => {
        setPlay(!play[0]);
        console.log(play);
      }}
    />
  );
};

export default DisBgmIcon;
