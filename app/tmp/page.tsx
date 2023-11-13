'use client';

import React, { useState, useEffect } from 'react';
import ChatRoomInfoModal from '@/components/ChatRoomInfoModal/ChatRoomInfoModal';
import InviteToChatRoomModal from '@components/InviteToChatRoomModal/InviteToChatRoomModal';
import { io } from 'socket.io-client';
import { useRecoilValue } from 'recoil';
import * as dormChatId from '@/recoil/dormChatId';
import * as dormChatInfo from '@/recoil/dormChatInfo';
import extractDateFromString from '@/utils/extractDateFromString';
import cutStringAfterColon from '@/utils/cutStringAfterColon';
import axios from 'axios';

const tmp = () => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isConnected, setIsConnected] = useState([]);
  const [myName, setMyName] = useState('');

  // const chatId = useRecoilValue(dormChatId.gryffindorChatIdState);
  const chatId = 'd3d7bff2-5b10-41c0-b6cd-5b5366995e31'; // 임시 chatId
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
  const GET_MY_INFO_URL = 'https://fastcampus-chat.net/auth/me';

  const headers = {
    Authorization: `Bearer ${ACCESS_TOKEN_RON}`,
    serverId: SERVER_KEY,
  };

  const socket = io(`https://fastcampus-chat.net/chat?chatId=${chatId}`, {
    extraHeaders: {
      // harry token으로 socket 생성
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGQ2MTZiOmhhcnJ5cG90dGVyIiwiaWF0IjoxNjk5MzQ1NDkzLCJleHAiOjE2OTk5NTAyOTN9.b5s4_9f-pVBj9ki17SXc6VvoiApMJZCJXfk5G2wskyo`,
      serverId: SERVER_KEY,
    },
  });

  useEffect(() => {
    axios.get(GET_MY_INFO_URL, { headers }).then((res) => {
      setMyName(res.data.user.name);
    });
  }, []);

  useEffect(() => {
    try {
      socket.emit('users');
      console.log('C->S 접속 상태 유저 목록 fetch 성공!');
    } catch (error) {
      console.error('C->S 접속 상태 유저 목록 fetch 실패!', error);
    }
  }, [socket]);

  // 무한호출 에러 해결 필요
  // useEffect(() => {
  //   try {
  //     socket.on('users-to-client', (response) => {
  //       console.log('접속 상태 유저 목록: ', response.users);
  //       console.log('S->C 접속 상태 유저 목록 pull 성공!');
  //       setIsConnected(response.users);
  //     });
  //   } catch (error) {
  //     console.error('S->C 접속 상태 유저 목록 pull 실패!', error);
  //   }
  // }, [socket]);

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

  const openInfoModal = () => {
    setIsInfoModalOpen(true);
  };

  const closeInfoModal = () => {
    setIsInfoModalOpen(false);
  };

  const openInviteModal = () => {
    setIsInviteModalOpen(true);
  };

  const closeInviteModal = () => {
    setIsInviteModalOpen(false);
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
        alert(`${myName}님 환영합니다!`);
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
      <button onClick={openInfoModal}>채팅방 정보 보기</button>
      <br />
      <button onClick={joinChatRoom}>참여하기</button>
      <br />
      <button onClick={leaveChatRoom}>나가기</button>
      <br />
      <button onClick={openInviteModal}>초대하기</button>

      <ChatRoomInfoModal
        title={data.title}
        numParticipants={data.numParticipants}
        host={data.host}
        creationDate={data.creationDate}
        participants={data.participants}
        onTitleChange={handleTitleChange}
        isOpen={isInfoModalOpen}
        onClose={closeInfoModal}
        isConnected={isConnected}
      />

      <InviteToChatRoomModal
        isOpen={isInviteModalOpen}
        onClose={closeInviteModal}
        chatId={chatId}
      />
    </div>
  );
};

export default tmp;
