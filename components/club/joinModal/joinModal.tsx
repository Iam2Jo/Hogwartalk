import React, { useEffect, useState } from 'react';
import * as styled from './joinModal.styles';
import CancelIcon from '@assets/icon/CancelIcon.svg';
import { chatInfoState, joinModalState } from '@recoil/chatList';
import { useRecoilState, useSetRecoilState } from 'recoil';
import axios from 'axios';
import { RequestBody as RequestBodyParticipate } from '@hooks/RESTAPI/participateChatting.types';
import { useRouter } from 'next/navigation';
import { getToken } from '@utils/service';
import { updateFirebaseData } from '@hooks/useFireFetch';

const joinModal = () => {
  const router = useRouter();
  const SERVER_KEY = process.env.NEXT_PUBLIC_SERVER_KEY;
  const [accessToken, setAccessToken] = useState('');

  const headers = {
    'Content-Type': 'application/json',
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    serverId: SERVER_KEY,
  };

  const chatInfo = useRecoilState(chatInfoState);
  const setJoinModalOpen = useSetRecoilState(joinModalState);

  const chatId = chatInfo[0].id;

  const handleParticipate = (chatId: string) => {
    const PARTICIPATE_CHAT_URL = process.env.NEXT_PUBLIC_PARTICIPATE_CHAT_URL;
    const requestData: RequestBodyParticipate = {
      chatId: chatId,
    };
    axios
      .patch(PARTICIPATE_CHAT_URL, requestData, { headers })
      .then((response) => {
        console.log('채팅 참여 성공!', response.data);
        updateFirebaseData('chatInfo', response.data.name, response.data);
        router.push(
          '/club/' + response.data.id + '&name=' + response.data.name,
        );
      })
      .catch((error) => {
        console.error('채팅 참여 실패!', error);
      });
  };

  const setJoin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(chatId);
    handleParticipate(chatId);
    setJoinModalOpen(false);
  };

  useEffect(() => {
    const token = getToken();
    setAccessToken(token);
  }, []);

  return (
    <>
      <styled.Container>
        <styled.CancelIcon>
          <CancelIcon
            onClick={() => {
              setJoinModalOpen(false);
              document.body.style.overflowY = 'auto';
            }}
          />
        </styled.CancelIcon>
        <styled.Content>
          <styled.Title>{chatInfo[0].name}</styled.Title>
          <styled.Desc>참여하시겠습니까?</styled.Desc>
          <styled.JoinBtn onClick={setJoin}>참여하기</styled.JoinBtn>
        </styled.Content>
      </styled.Container>
      <styled.Background />
    </>
  );
};

export default joinModal;
