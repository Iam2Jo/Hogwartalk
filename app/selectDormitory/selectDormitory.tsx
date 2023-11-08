'use client'

import type { NextPage } from 'next'
import { io } from 'socket.io-client';
import axios from 'axios';
import * as styled from './selectDormitory.styles'

interface Message {
    id: string;
    text: string;
    userId: string;
    createdAt: Date;
  }

interface Chat {
    id: string;
    name: string;
    isPrivate: boolean;
    users: string[];
    messages: Message[]; // message 객체가 속합니다.  
    updatedAt: Date;
  }

interface RequestBody{
    name: string, // chat 이름
    users: string[], // 참가자들 id(자신 미포함)
    isPrivate?: boolean // 공개 비공개
}

const SelectDormitory: NextPage = () => {
  const SERVER_KEY = '660d616b';
  const CREATE_CHAT_URL = 'https://fastcampus-chat.net/chat';
  const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGQ2MTZiOmhhcnJ5cG90dGVyIiwiaWF0IjoxNjk5MzQ1NDkzLCJleHAiOjE2OTk5NTAyOTN9.b5s4_9f-pVBj9ki17SXc6VvoiApMJZCJXfk5G2wskyo'

  const headers = {
    'Content-Type': 'application/json',
    'serverId': SERVER_KEY,
    'Authorization': `Bearer ${ACCESS_TOKEN}`
  };

  const socket = io(CREATE_CHAT_URL, {
    extraHeaders: headers
  });
  
//   socket.on('connect', () => {
//     console.log('Connected to the socket.');
  
//     const requestData: RequestBody = {
//       name: 'griffindor',
//       users: [],
//     };
  
//     axios.post(CREATE_CHAT_URL, requestData, { headers })
//       .then((response) => {
//         console.log('Request was successful:', response.data);
//       })
//       .catch((error) => {
//         console.error('Error sending the request:', error);
//       });
//   });
  
//   socket.on('message', (data) => {
//     console.log('Received message:', data);
//   });
  
//   socket.on('disconnect', () => {
//     console.log('Disconnected from the socket.');
//   });

  return (
    <h1>
      SelectDormitory Page ㅋㅋㅋfff
      <styled.GryffindorSVG/>
      <styled.SlytherinSVG/>
      <styled.HufflepuffSVG/>
      <styled.RavenclawSVG/>
      <styled.ClubSVG/>
    </h1>
  );
};

export default SelectDormitory;