// socket.js
import { io } from 'socket.io-client';

const accessTokenCookie = document.cookie
  .split('; ')
  .find((row) => row.startsWith('accessToken='));

if (!accessTokenCookie) {
  console.error('Access token not found in cookies');
}

const accessToken = accessTokenCookie.split('=')[1];

const serverId = process.env.NEXT_PUBLIC_SERVER_KEY;

const socket = io('https://fastcampus-chat.net/server', {
  extraHeaders: {
    'content-type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
    serverId: serverId,
  },
});

export default socket;
