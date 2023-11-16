'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

export function findMyId(ACCESS_TOKEN) {
  const SERVER_KEY = process.env.NEXT_PUBLIC_SERVER_KEY;
  const FIND_MY_ID_URL = process.env.NEXT_PUBLIC_FIND_MY_ID_URL;

  const headers = {
    'Content-Type': 'application/json',
    serverId: SERVER_KEY,
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };

  const [myId, setMyId] = useState<string>(null);

  useEffect(() => {
    axios
      .get(FIND_MY_ID_URL, { headers })
      .then((response) => {
        setMyId(response.data.user?.id);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return myId;
}
