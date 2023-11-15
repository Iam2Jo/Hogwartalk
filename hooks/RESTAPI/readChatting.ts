'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { ResponseValue } from '@/@types/RESTAPI/findAllChatting.types';

export function readChatting() {
  const SERVER_KEY = process.env.REACT_APP_SERVER_KEY;
  const CREATE_CHAT_URL = process.env.REACT_APP_CREATE_CHAT_URL;

  const ACCESS_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGQ2MTZiOmhhcnJ5cG90dGVyIiwiaWF0IjoxNjk5MzQ1NDkzLCJleHAiOjE2OTk5NTAyOTN9.b5s4_9f-pVBj9ki17SXc6VvoiApMJZCJXfk5G2wskyo';

  const headers = {
    'Content-Type': 'application/json',
    serverId: SERVER_KEY,
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };

  const [data, setData] = useState<ResponseValue | null>(null);

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
