'use client';

import React, { use, useEffect, useState } from 'react';
import { createChatting } from '@hooks/createChatting';
import { readChatting } from '@hooks/readChatting';
import { io } from 'socket.io-client';
import { gryffindorChatIdState } from '@recoil/dormChatId';
import { useRecoilValue } from 'recoil';
import axios from 'axios';

interface RequestBody {
  chatId: string;
}

type ResponseValue = any;
// type ResponseValue = Chat[]

type RequestData = string;

interface User {
  id: string;
  name: string;
  picture: string;
}

interface ResponseData {
  messages: Message[];
}

interface Message {
  id: string;
  text: string;
  userId: string;
  createAt: Date;
}

const Gryffindor = () => {
  const gryffindorChatId = useRecoilValue(gryffindorChatIdState);
  const DORMITORY_NAME = 'gryffindor';
  const data: ResponseValue | null = readChatting();
  const [chatData, setChatData] = useState<ResponseValue | null>();
  const [text, setText] = useState<RequestData>('');
  const [previousMessages, setPreviousMessages] = useState<Message[]>([]);

  const SERVER_KEY = '660d616b';
  const ACCESS_TOKEN_HARRY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGQ2MTZiOmhhcnJ5cG90dGVyIiwiaWF0IjoxNjk5MzQ1NDkzLCJleHAiOjE2OTk5NTAyOTN9.b5s4_9f-pVBj9ki17SXc6VvoiApMJZCJXfk5G2wskyo';
  const ACCESS_TOKEN_HERMIONE =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGQ2MTZiOmhlcm1pb25lIiwiaWF0IjoxNjk5NDIzOTI4LCJleHAiOjE3MDAwMjg3Mjh9.9FA24mkoipWSd4KlpxTX0L8mKmJj7LAVd_XEcW1Xt7w';
  const PARTICIPATE_CHAT_URL = 'https://fastcampus-chat.net/chat/participate';

  const headers = {
    Authorization: `Bearer ${ACCESS_TOKEN_HERMIONE}`,
    serverId: SERVER_KEY,
  };

  const requestData: RequestBody = {
    chatId: gryffindorChatId,
  };

  const serverSocket = io(`https://fastcampus-chat.net/server`, {
    extraHeaders: headers,
  });

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

  useEffect(() => {
    try {
      chatSocket.emit('fetch-messages');
      console.log('C->S 이전 대화목록 가져오기 성공!');
    } catch (error) {
      console.error('C->S 이전 대화목록 가져오기 실패!', error);
    }
  }, []);

  useEffect(() => {
    try {
      chatSocket.on('messages-to-client', (messageObject: any) => {
        console.log(messageObject);
        setPreviousMessages(messageObject.messages);
        console.log('S->C 이전 대화목록 가져오기 성공!');
      });
    } catch (error) {
      console.error('S->C 이전 대화목록 가져오기 실패!', error);
    }
  }, []);

  useEffect(() => {
    console.log('gryffindorChatId', gryffindorChatId);
  }, [gryffindorChatId]);

  return (
    <div>
      <div>그리핀도르</div>
      <div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      {previousMessages.map((message) => (
        <div key={message.id}>
          <span>{message.userId}: </span>
          <span>{message.text}</span>
        </div>
      ))}
    </div>
  );
};

export default Gryffindor;
