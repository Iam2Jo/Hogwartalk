import React from 'react';
import * as styled from './joinModal.styles';
import CancelIcon from '@assets/img/cancelIcon.svg';
import { chatTitleState, joinModalState } from '@recoil/chatList';
import { useRecoilState, useSetRecoilState } from 'recoil';

const joinModal = () => {
  const chatTitle = useRecoilState(chatTitleState);
  const setJoinModalOpen = useSetRecoilState(joinModalState);
  return (
    <styled.Container>
      <styled.CancelIcon>
        <CancelIcon
          onClick={() => {
            setJoinModalOpen(false);
          }}
        />
      </styled.CancelIcon>
      <styled.Content>
        <styled.Title>{chatTitle[0]}</styled.Title>
        <styled.Desc>참여하시겠습니까?</styled.Desc>
        <styled.JoinBtn>참여하기</styled.JoinBtn>
      </styled.Content>
    </styled.Container>
  );
};

export default joinModal;
