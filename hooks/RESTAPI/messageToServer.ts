// import { io } from 'socket.io-client';

// interface Message {
//     id: string;
//     text: string;
//     userId: string;
//     createdAt: Date;
//   }

// interface Chat {
//     id: string;
//     name: string;
//     isPrivate: boolean;
//     users: string[];
//     messages: Message[]; // message 객체가 속합니다.  
//     updatedAt: Date;
//   }

// interface RequestBody{
//     name: string, // chat 이름
//     users: string[], // 참가자들 id(자신 미포함)
//     isPrivate?: boolean // 공개 비공개
// }
// const myUsers =   [
//     {
//         "id": "harrypotter",
//         "username": "harry",
//         "picture": "https://gravatar.com/avatar/bdd1304f4419dccb6e48bdf55eb156a7?s=200&d=retro"
//     },
//     {
//         "id": "hermione",
//         "username": "hermione",
//         "picture": "https://gravatar.com/avatar/b1c5b8b2954a9bfdcbabb676220b1b69?s=200&d=retro"
//     },
//     {
//         "id": "ron",
//         "username": "ron",
//         "picture": "https://gravatar.com/avatar/35074d93234018c888c7d48b7c6a3c6a?s=200&d=retro"
//     }
// ]

// export function createChatting(chatId: string, text: string){
//     const SERVER_KEY = '660d616b';
//     const CREATE_CHAT_URL = 'https://fastcampus-chat.net/chat';
//     const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGQ2MTZiOmhhcnJ5cG90dGVyIiwiaWF0IjoxNjk5MzQ1NDkzLCJleHAiOjE2OTk5NTAyOTN9.b5s4_9f-pVBj9ki17SXc6VvoiApMJZCJXfk5G2wskyo'

//     const socket = io(CREATE_CHAT_URL, {
//       extraHeaders: headers
//     });
   

//     socket.on(`https://fastcampus-chat.net/chat?chatId=${chatId}`,
//     {
//       extraHeaders: {
//         Authorization: `Bearer ${ACCESS_TOKEN}`,
//         serverId: SERVER_KEY,
//       },
//     })
//     socket.emit('message-to-server', text)

//     return null;
// }


export {};