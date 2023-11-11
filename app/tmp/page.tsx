'use client';

import React, { useState, useEffect } from 'react';
import ChatRoomInfoModal from '@/components/ChatRoomInfoModal/ChatRoomInfoModal';
import { io } from 'socket.io-client';
import { useRecoilValue } from 'recoil';
import * as dormChatId from '@/recoil/dormChatId';
import * as dormChatInfo from '@/recoil/dormChatInfo';
import extractDateFromString from '@/utils/extractDateFromString';

const tmp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConnected, setIsConnected] = useState([]);

  const chatId = useRecoilValue(dormChatId.gryffindorChatIdState);
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
  const ACCESS_TOKEN_HERMIONE =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGQ2MTZiOmhlcm1pb25lIiwiaWF0IjoxNjk5NDIzOTI4LCJleHAiOjE3MDAwMjg3Mjh9.9FA24mkoipWSd4KlpxTX0L8mKmJj7LAVd_XEcW1Xt7w';

  const headers = {
    Authorization: `Bearer ${ACCESS_TOKEN_HERMIONE}`,
    serverId: SERVER_KEY,
  };

  const socket = io(`https://fastcampus-chat.net/chat?chatId=${chatId}`, {
    extraHeaders: headers,
  });

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
        console.log(response.data);
        console.log('C->S 접속 상태 유저 목록 pull 성공!');
        setIsConnected(response.data);
      });
    } catch (error) {
      console.error('C->S 접속 상태 유저 목록 pull 실패!', error);
    }
  }, [socket]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleTitleChange = (newTitle) => {
    setChatRoomTitle(newTitle);
  };

  return (
    <div>
      <button onClick={openModal}>채팅방 정보 보기</button>

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
