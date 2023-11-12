'use client';

import React, { useState, useEffect } from 'react';
import ChatRoomInfoModal from '@/components/ChatRoomInfoModal/ChatRoomInfoModal';
import { io } from 'socket.io-client';
import { useRecoilValue } from 'recoil';
import * as dormChatId from '@/recoil/dormChatId';
import * as dormChatInfo from '@/recoil/dormChatInfo';
import extractDateFromString from '@/utils/extractDateFromString';
import cutStringAfterColon from '@/utils/cutStringAfterColon';
import axios from 'axios';

const tmp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConnected, setIsConnected] = useState([]);

  // const chatId = useRecoilValue(dormChatId.gryffindorChatIdState);
  const chatId = '1521f809-caf5-4d21-998d-9367d8133bfa';
  const { name, users, updatedAt, host } = useRecoilValue(
    dormChatInfo.gryffindorChatInfoState,
  );

  const data = {
    title: name,
    numParticipants: users.length,
    host,
    creationDate: extractDateFromString(updatedAt),
    participants: users,
  };
  const [chatRoomTitle, setChatRoomTitle] = useState(data.title);

  const SERVER_KEY = '660d616b';
  const ACCESS_TOKEN_RON =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGQ2MTZiOnJvbiIsImlhdCI6MTY5OTQyNDAzMSwiZXhwIjoxNzAwMDI4ODMxfQ.P5KjgZ9K7zuN6X6sJm4f_DJV0opEqruAuVbRe9VlDZQ';
  const CHATROOM_LEAVE_URL = 'https://fastcampus-chat.net/chat/leave';
  const CHATROOM_JOIN_URL = 'https://fastcampus-chat.net/chat/participate';

  const headers = {
    Authorization: `Bearer ${ACCESS_TOKEN_RON}`,
    serverId: SERVER_KEY,
  };

  const socket = io(`https://fastcampus-chat.net/chat?chatId=${chatId}`, {
    extraHeaders: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGQ2MTZiOmhhcnJ5cG90dGVyIiwiaWF0IjoxNjk5MzQ1NDkzLCJleHAiOjE2OTk5NTAyOTN9.b5s4_9f-pVBj9ki17SXc6VvoiApMJZCJXfk5G2wskyo`,
      serverId: SERVER_KEY,
    },
  });

  // const server = io(`https://fastcampus-chat.net/server`, {
  //   extraHeaders: {
  //     Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGQ2MTZiOmhhcnJ5cG90dGVyIiwiaWF0IjoxNjk5MzQ1NDkzLCJleHAiOjE2OTk5NTAyOTN9.b5s4_9f-pVBj9ki17SXc6VvoiApMJZCJXfk5G2wskyo`,
  //     serverId: SERVER_KEY,
  //   },
  // });

  useEffect(() => {
    try {
      socket.emit('users');
      console.log('C->S 접속 상태 유저 목록 fetch 성공!');
    } catch (error) {
      console.error('C->S 접속 상태 유저 목록 fetch 실패!', error);
    }
  }, [socket]);

  useEffect(() => {
    try {
      socket.on('users-to-client', (response) => {
        console.log('접속 상태 유저 목록: ', response.users);
        console.log('S->C 접속 상태 유저 목록 pull 성공!');
        setIsConnected(response.users);
      });
    } catch (error) {
      console.error('S->C 접속 상태 유저 목록 pull 실패!', error);
    }
  }, [socket]);

  try {
    socket.on('join', (response) => {
      console.log(
        cutStringAfterColon(response.joiners[0].id),
        '님이 입장하셨습니다.',
      );
      setIsConnected(response.users);
      console.log('S->C 유저 입장 정보 불러오기 성공!');
    });
  } catch (error) {
    console.error('S->C 유저 입장 정보 불러오기 실패!', error);
  }

  try {
    socket.on('leave', (response) => {
      console.log(response.leaver, '님이 퇴장하셨습니다.');
      setIsConnected(response.users);
      console.log('S->C 유저 퇴장 정보 불러오기 성공!');
    });
  } catch (error) {
    console.error('S->C 유저 퇴장 정보 불러오기 실패!', error);
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleTitleChange = (newTitle) => {
    setChatRoomTitle(newTitle);
  };

  const joinChatRoom = () => {
    console.log('입장roomId', chatId);

    axios
      .patch(CHATROOM_JOIN_URL, { chatId }, { headers })
      .then((response) => {
        console.log(response.data);
        // 배열의 가장 끝에 추가되는 원소를 가져옴
        alert(`${response.data.users[users.length].username}님 환영합니다!`);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const leaveChatRoom = () => {
    axios
      .patch(CHATROOM_LEAVE_URL, { chatId }, { headers })
      .then((response) => {
        alert(response.data.message);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <button onClick={openModal}>채팅방 정보 보기</button>
      <br />
      <button onClick={joinChatRoom}>참여하기</button>
      <br />
      <button onClick={leaveChatRoom}>나가기</button>

      <ChatRoomInfoModal
        title={data.title}
        numParticipants={data.numParticipants}
        host={data.host}
        creationDate={data.creationDate}
        participants={data.participants}
        onTitleChange={handleTitleChange}
        isOpen={isModalOpen}
        onClose={closeModal}
        isConnected={isConnected}
      />
    </div>
  );
};

export default tmp;
