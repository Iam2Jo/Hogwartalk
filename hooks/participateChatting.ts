import axios from 'axios';

interface RequestBody {
  chatId: string;
}
// 론 accesstoken : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGQ2MTZiOnJvbiIsImlhdCI6MTY5OTQyNDAzMSwiZXhwIjoxNzAwMDI4ODMxfQ.P5KjgZ9K7zuN6X6sJm4f_DJV0opEqruAuVbRe9VlDZQ
// 헤르미온느 accesstoken : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGQ2MTZiOmhhcnJ5cG90dGVyIiwiaWF0IjoxNjk5MzQ1NDkzLCJleHAiOjE2OTk5NTAyOTN9.b5s4_9f-pVBj9ki17SXc6VvoiApMJZCJXfk5G2wskyo
export function participateChatting(chatId) {
  const SERVER_KEY = '660d616b';
  const CREATE_CHAT_URL = 'https://fastcampus-chat.net/chat/participate';
  const ACCESS_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGQ2MTZiOmhhcnJ5cG90dGVyIiwiaWF0IjoxNjk5MzQ1NDkzLCJleHAiOjE2OTk5NTAyOTN9.b5s4_9f-pVBj9ki17SXc6VvoiApMJZCJXfk5G2wskyo';

  const headers = {
    'Content-Type': 'application/json',
    serverId: SERVER_KEY,
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };

  const requestData: RequestBody = {
    chatId: chatId,
  };

  axios
    .patch(CREATE_CHAT_URL, requestData, { headers })
    .then((response) => {
      console.log('채팅 참여 성공!', response.data);
    })
    .catch((error) => {
      console.error('채팅 참여 실패!', error);
    });

  return null;
}
