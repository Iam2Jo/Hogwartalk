'use client';

import React, { useState, useRef } from 'react';
import { findMyId } from '@hooks/findMyId';
import { io } from 'socket.io-client';
import { gryffindorChatIdState } from '@recoil/dormChatId';
import { useRecoilValue } from 'recoil';
import * as styled from './gryffindor.styles';
import {
  useFetchMessages,
  useMessageToClient,
  useMessagesToClient,
  useScrollToBottom,
} from '@hooks/chatSocket';
import { RequestData } from '@/@types/Socket/emit/messageToServer.types';
import { Message } from '@/@types/Socket/on/messagesToClient.types';

const Gryffindor = () => {
  const messageContainerRef = useRef(null);
  const gryffindorChatId = useRecoilValue(gryffindorChatIdState);
  const [text, setText] = useState<RequestData>('');
  const [previousMessages, setPreviousMessages] = useState<Message[]>([]);

  const SERVER_KEY = '660d616b';
  const ACCESS_TOKEN_HARRY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGQ2MTZiOmhhcnJ5cG90dGVyIiwiaWF0IjoxNjk5MzQ1NDkzLCJleHAiOjE2OTk5NTAyOTN9.b5s4_9f-pVBj9ki17SXc6VvoiApMJZCJXfk5G2wskyo';
  const ACCESS_TOKEN_HERMIONE =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGQ2MTZiOmhlcm1pb25lIiwiaWF0IjoxNjk5NDIzOTI4LCJleHAiOjE3MDAwMjg3Mjh9.9FA24mkoipWSd4KlpxTX0L8mKmJj7LAVd_XEcW1Xt7w';
  const myId = findMyId(ACCESS_TOKEN_HERMIONE);
  const headers = {
    Authorization: `Bearer ${ACCESS_TOKEN_HERMIONE}`,
    serverId: SERVER_KEY,
  };
  const chatSocket = io(
    `https://fastcampus-chat.net/chat?chatId=${gryffindorChatId}`,
    {
      extraHeaders: headers,
    },
  );

  const sendMessage = () => {
    try {
      if (text.trim() !== '') {
        chatSocket.emit('message-to-server', text);
        setText('');
        console.log('C->S 메시지 전송 성공!');
      }
    } catch (error) {
      console.error('C->S 메시지 전송 실패!', error);
    }
  };

  useFetchMessages(chatSocket);
  useMessageToClient(chatSocket);
  useMessagesToClient(chatSocket, setPreviousMessages);
  useScrollToBottom(messageContainerRef, previousMessages);

  return (
    <styled.GryffindorContainer>
      <styled.MessageContainer ref={messageContainerRef}>
        {previousMessages
          .slice()
          .reverse()
          .map((message) => {
            const messageDate = new Date(message.createdAt);
            const timeString = messageDate.toLocaleString('en-US', {
              timeZone: 'Asia/Seoul',
              hour12: false,
              hour: 'numeric',
              minute: 'numeric',
            });
            return (
              <styled.MessageWrapper
                key={message.id}
                $isCurrentUser={message.userId.split(':')[1] === myId}
              >
                <div>
                  {message.userId.split(':')[1] !== myId && (
                    <span>{message.userId.split(':')[1]}: </span>
                  )}
                  <span>{timeString}</span>
                </div>
                <div>
                  <span>{message.text}</span>
                </div>
              </styled.MessageWrapper>
            );
          })}
      </styled.MessageContainer>
      <styled.InputWrapper>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <button onClick={sendMessage}>Send</button>
      </styled.InputWrapper>
    </styled.GryffindorContainer>
  );
};

export default Gryffindor;
