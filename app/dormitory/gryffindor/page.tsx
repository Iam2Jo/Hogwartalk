'use client';

import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import { gryffindorChatIdState } from '@recoil/dormChatId';
import { useRecoilValue } from 'recoil';
import axios from 'axios';

interface RequestBody {
  chatId: string;
}

const Gryffindor = () => {
  const gryffindorChatId = useRecoilValue(gryffindorChatIdState);

  const SERVER_KEY = '660d616b';
  const ACCESS_TOKEN_HARRY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGQ2MTZiOmhhcnJ5cG90dGVyIiwiaWF0IjoxNjk5MzQ1NDkzLCJleHAiOjE2OTk5NTAyOTN9.b5s4_9f-pVBj9ki17SXc6VvoiApMJZCJXfk5G2wskyo';
  const ACCESS_TOKEN_HERMIONE =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGQ2MTZiOmhlcm1pb25lIiwiaWF0IjoxNjk5NDIzOTI4LCJleHAiOjE3MDAwMjg3Mjh9.9FA24mkoipWSd4KlpxTX0L8mKmJj7LAVd_XEcW1Xt7w';
  const PARTICIPATE_CHAT_URL = 'https://fastcampus-chat.net/chat/participate';

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${ACCESS_TOKEN_HERMIONE}`,
    serverId: SERVER_KEY,
  };

  const requestData: RequestBody = {
    chatId: gryffindorChatId,
  };

  useEffect(() => {
    axios
      .patch(PARTICIPATE_CHAT_URL, requestData, { headers })
      .then((response) => {
        console.log('Gryffindor 채팅방 참여 완료', response.data);

        const socket = io(
          `https://fastcampus-chat.net/chat?chatId=${gryffindorChatId}`,
          {
            extraHeaders: headers,
          },
        );

        // socket.emit('message-to-server', 'test');

        // socket.on('message-to-client', (messageObject) => {
        //   console.log(messageObject);
        // });
      })
      .catch((error) => {
        console.error('Error sending the request:', error);
      });
  }, []);

  return <div>그리핀도르</div>;
};

export default Gryffindor;
