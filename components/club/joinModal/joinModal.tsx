import React from 'react';
import * as styled from './joinModal.styles';
import CancelIcon from '@assets/icon/cancelIcon.svg';
import { chatInfoState, joinModalState } from '@recoil/chatList';
import { useRecoilState, useSetRecoilState } from 'recoil';
import axios from 'axios';
import { RequestBody as RequestBodyParticipate } from '@/@types/RESTAPI/participateChatting.types';

const joinModal = () => {
  const SERVER_KEY = '660d616b';
  const ACCESS_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGQ2MTZiOmhlcm1pb25lIiwiaWF0IjoxNjk5NDIzOTI4LCJleHAiOjE3MDAwMjg3Mjh9.9FA24mkoipWSd4KlpxTX0L8mKmJj7LAVd_XEcW1Xt7w';
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    serverId: SERVER_KEY,
  };

  const chatInfo = useRecoilState(chatInfoState);
  const setJoinModalOpen = useSetRecoilState(joinModalState);

  const chatId = chatInfo[0].id;

  const handleParticipate = (chatId: string) => {
    const PARTICIPATE_CHAT_URL = 'https://fastcampus-chat.net/chat/participate';
    const requestData: RequestBodyParticipate = {
      chatId: chatId,
    };
    axios
      .patch(PARTICIPATE_CHAT_URL, requestData, { headers })
      .then((response) => {
        console.log('채팅 참여 성공!', response.data);
      })
      .catch((error) => {
        console.error('채팅 참여 실패!', error);
      });
  };

  const setJoin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(chatId);
    handleParticipate(chatId);
  };

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
        <styled.Title>{chatInfo[0].name}</styled.Title>
        <styled.Desc>참여하시겠습니까?</styled.Desc>
        <styled.JoinBtn onClick={setJoin}>참여하기</styled.JoinBtn>
      </styled.Content>
    </styled.Container>
  );
};

export default joinModal;
