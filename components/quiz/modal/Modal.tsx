import { teamState } from '@recoil/atom';
import React from 'react';
import { useRecoilValue } from 'recoil';
import * as style from './Modal.styles';
import Link from 'next/link';
import Gryffindor from '@assets/img/Gryffindor.svg';
import Hufflepuff from '@assets/img/Hufflepuff.svg';
import Ravenclaw from '@assets/img/Ravenclaw.svg';
import Slytherin from '@assets/img/Slytherin.svg';

const Modal = () => {
  const team = useRecoilValue(teamState);

  return (
    <style.Modal>
      <style.Container>
        <style.Img>
          {(() => {
            switch (team) {
              case '그리핀도르':
                return <Gryffindor width="360" height="400" />;
              case '후플푸프':
                return <Hufflepuff width="360" height="400" />;
              case '래번클로':
                return <Ravenclaw width="360" height="400" />;
              case '슬리데린':
                return <Slytherin width="360" height="400" />;
            }
          })()}
        </style.Img>
        <style.Content>
          <style.Title>
            {(() => {
              switch (team) {
                case '그리핀도르':
                  return '용감하고 대담한 자를 위한 기숙사, 그리핀도르';
                case '후플푸프':
                  return '성실하고 진실된 자를 위한 기숙사, 후플푸프';
                case '래번클로':
                  return '현명하고 사려 깊은 자를 위한 기숙사, 래번클로';
                case '슬리데린':
                  return '재간꾼들을 위한 기숙사, 슬리데린';
              }
            })()}
          </style.Title>
          <style.Text>배정을 축하합니다.</style.Text>
        </style.Content>
        <Link href="/signup">
          <style.NextBtn>이어서 작성하기</style.NextBtn>
        </Link>
      </style.Container>
    </style.Modal>
  );
};

export default Modal;
