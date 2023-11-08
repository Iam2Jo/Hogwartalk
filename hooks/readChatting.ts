import { io } from 'socket.io-client';
import axios from 'axios';

const SERVER_KEY = '660d616b';
const CREATE_CHAT_URL = 'https://fastcampus-chat.net/chat/all';
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGQ2MTZiOmhhcnJ5cG90dGVyIiwiaWF0IjoxNjk5MzQ1NDkzLCJleHAiOjE2OTk5NTAyOTN9.b5s4_9f-pVBj9ki17SXc6VvoiApMJZCJXfk5G2wskyo'

const headers = {
  'serverId': SERVER_KEY,
  'Authorization': `Bearer ${ACCESS_TOKEN}`
};

const socket = io(CREATE_CHAT_URL, {
  extraHeaders: headers
});

socket.on('connect', () => {
  console.log('Connected to the socket.');

//   axios.get(CREATE_CHAT_URL, { headers })
//     .then((response) => {
//       console.log('Request was successful:', response.data);
//     })
//     .catch((error) => {
//       console.error('Error sending the request:', error);
//     });
});

socket.on('data', (data) => {
  console.log('Received message:', data);
});
socket.on('error', (error) => {
    console.error('Socket.IO Error:', error);
  });
socket.on('disconnect', () => {
  console.log('Disconnected from the socket.');
});

export default socket;