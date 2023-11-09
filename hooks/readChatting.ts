'use client';

import { io } from 'socket.io-client';
import axios from 'axios';
import { useEffect, useState } from 'react';

type ResponseValue = Chat[]

interface Chat {
  id: string;
  name: string;
  users: User[]; // 속한 유저 정보
  isPrivate: boolean;
  latestMessage: Message | null;
  updatedAt: Date;
}

interface User {
  id: string;
  name: string;
  picture: string;
}

interface Message {
  id: string;
  text: string;
  userId: string;
  createAt: Date;
}

export function readChatting(){
    const SERVER_KEY = '660d616b';
    const CREATE_CHAT_URL = 'https://fastcampus-chat.net/chat/all';
    const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGQ2MTZiOmhhcnJ5cG90dGVyIiwiaWF0IjoxNjk5MzQ1NDkzLCJleHAiOjE2OTk5NTAyOTN9.b5s4_9f-pVBj9ki17SXc6VvoiApMJZCJXfk5G2wskyo'
    
    const headers = {
      'Content-Type': 'application/json',
      'serverId': SERVER_KEY,
      'Authorization': `Bearer ${ACCESS_TOKEN}`
    };
    
    const socket = io(CREATE_CHAT_URL, {
      extraHeaders: headers
    });
    
    const [data, setData] = useState<ResponseValue | null>(null);
    
    useEffect(() => {
      axios.get(CREATE_CHAT_URL, { headers })
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }, []);

    return data
}
