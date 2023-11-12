'use client';

import React, { useState, useRef, useEffect } from 'react';
import { findMyId } from '@hooks/findMyId';
import { io } from 'socket.io-client';
import { hufflepuffChatIdState } from '@recoil/dormChatId';
import { useRecoilValue } from 'recoil';
import * as styled from './hufflepuff.styles';
import {
  useFetchMessages,
  useMessageToClient,
  useMessagesToClient,
  useScrollToBottom,
} from '@hooks/useChatSocketHooks';
import { scrollToBottom, handleScroll } from '@utils/scrollUtils';

import { RequestData } from '@/@types/Socket/emit/messageToServer.types';
import { Message } from '@/@types/Socket/on/messagesToClient.types';

const Hufflepuff = () => {
  const hufflepuffChatId = useRecoilValue(hufflepuffChatIdState);
  const [text, setText] = useState<RequestData>('');
  const [previousMessages, setPreviousMessages] = useState<Message[]>([]);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messageContainerRef = useRef<HTMLDivElement | null>(null);
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
    `https://fastcampus-chat.net/chat?chatId=${hufflepuffChatId}`,
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

  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom(messagesEndRef);
    }
  }, [isAtBottom]);

  return (
    <styled.DormitoryContainer>
      <styled.MessageContainer
        ref={messageContainerRef}
        onScroll={(e) => handleScroll(e, setIsAtBottom, messageContainerRef)}
      >
        {previousMessages.map((message) => {
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
              $isCurrentUser={message.userId === myId}
            >
              <styled.MessageInfo>
                {message.userId !== myId && (
                  <styled.MessageUserId>{message.userId}</styled.MessageUserId>
                )}
                <styled.MessageTime>{timeString}</styled.MessageTime>
              </styled.MessageInfo>
              <div>
                <styled.MessageText $isCurrentUser={message.userId === myId}>
                  {message.text}
                </styled.MessageText>
              </div>
            </styled.MessageWrapper>
          );
        })}
        <div ref={messagesEndRef} />
      </styled.MessageContainer>
      <styled.ScrollToBottomButton
        onClick={() => scrollToBottom(messagesEndRef)}
        $isVisible={!isAtBottom}
      >
        <styled.BottomIcon />
      </styled.ScrollToBottomButton>
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
        <button onClick={sendMessage}>전송</button>
      </styled.InputWrapper>
    </styled.DormitoryContainer>
  );
};

export default Hufflepuff;
