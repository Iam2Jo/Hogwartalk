'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { ResponseValue } from '@/@types/RESTAPI/findAllChatting.types';
import { getToken } from '@utils/service';
export function readChatting() {
  const SERVER_KEY = process.env.NEXT_PUBLIC_SERVER_KEY;
  const CREATE_CHAT_URL = process.env.NEXT_PUBLIC_CREATE_CHAT_URL;
  const [accessToken, setAccessToken] = useState('');

  const headers = {
    'Content-Type': 'application/json',
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    serverId: SERVER_KEY,
  };

  const [data, setData] = useState<ResponseValue | null>(null);

  useEffect(() => {
    const token = getToken();
    setAccessToken(token);
  }, []);

  useEffect(() => {
    axios
      .get(CREATE_CHAT_URL, { headers })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return data;
}
