import axios from 'axios';
import { RequestBody } from '@/@types/RESTAPI/createChatting.types';

const myUsers = [
  {
    id: 'harrypotter',
    username: 'harry',
    picture:
      'https://gravatar.com/avatar/bdd1304f4419dccb6e48bdf55eb156a7?s=200&d=retro',
  },
  {
    id: 'hermione',
    username: 'hermione',
    picture:
      'https://gravatar.com/avatar/b1c5b8b2954a9bfdcbabb676220b1b69?s=200&d=retro',
  },
  {
    id: 'ron',
    username: 'ron',
    picture:
      'https://gravatar.com/avatar/35074d93234018c888c7d48b7c6a3c6a?s=200&d=retro',
  },
];

export function createChatting(dormitory: string) {
  const SERVER_KEY = '660d616b';
  const CREATE_CHAT_URL = 'https://fastcampus-chat.net/chat';
  const ACCESS_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGQ2MTZiOmhhcnJ5cG90dGVyIiwiaWF0IjoxNjk5MzQ1NDkzLCJleHAiOjE2OTk5NTAyOTN9.b5s4_9f-pVBj9ki17SXc6VvoiApMJZCJXfk5G2wskyo';
  const users: string[] = myUsers.map((user) => user.id);

  const headers = {
    'Content-Type': 'application/json',
    serverId: SERVER_KEY,
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };

  const requestData: RequestBody = {
    name: dormitory,
    users: users,
  };

  axios
    .post(CREATE_CHAT_URL, requestData, { headers })
    .then((response) => {
      console.log('Request was successful:', response.data);
    })
    .catch((error) => {
      console.error('Error sending the request:', error);
    });

  return null;
}
