import React, { useEffect, useState } from 'react';
import * as styled from './InviteToChatRoomModal.styles';
import {
  UserItem,
  ProfileImage,
  UserInfo,
  Username,
  Emoji,
  UserDormitory,
} from '../FriendSearchToggle/FriendSearchToggle.styles';
import axios from 'axios';
import { io } from 'socket.io-client';
import { get } from 'http';

interface InviteToChatRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  chatId: string;
}

interface User {
  id: string;
  name: string;
  picture: string;
}

const InviteToChatRoomModal = ({
  isOpen,
  onClose,
  chatId,
}: InviteToChatRoomModalProps) => {
  if (!isOpen) return null;

  const [allUsers, setAllUsers] = useState([]);
  const [isConnected, setIsConnected] = useState([]);
  const [currentChatUsers, setCurrentChatUsers] = useState<User[]>([]);

  const SERVER_KEY = '660d616b';
  const ACCESS_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGQ2MTZiOmhhcnJ5cG90dGVyIiwiaWF0IjoxNjk5MzQ1NDkzLCJleHAiOjE2OTk5NTAyOTN9.b5s4_9f-pVBj9ki17SXc6VvoiApMJZCJXfk5G2wskyo';
  const GET_ALL_USERS_URL = 'https://fastcampus-chat.net/users';
  const GET_ALL_CHATTINGS_URL = 'https://fastcampus-chat.net/chat/all';

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    serverId: SERVER_KEY,
  };

  const socket = io(`https://fastcampus-chat.net/chat`, {
    extraHeaders: {
      Authorization: `Bearer ${ACCESS_TOKEN}}`,
      serverId: SERVER_KEY,
    },
  });

  // 모듈화
  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // 모듈화
  const getStatusCircleColor = (participantName: string): boolean => {
    return isConnected?.includes(participantName);
  };

  // 현재 채팅에 있는 유저 불러오기
  useEffect(() => {
    axios.get(GET_ALL_CHATTINGS_URL, { headers }).then((response) => {
      console.log('모든 유저: ', response.data);

      const chats = response.data.chats;
      const { users } = chats.find((room) => room.id === chatId);
      setCurrentChatUsers(users);
    });
  }, []);

  // 모든 유저 불러오기(현재 채팅에 없는 사람만)
  useEffect(() => {
    axios.get(GET_ALL_USERS_URL, { headers }).then((response) => {
      console.log('모든 유저: ', response.data);
      console.log('현재 채팅에 있는 유저: ', currentChatUsers);

      const otherUsers = response.data.filter(
        (user) =>
          !currentChatUsers.some(
            (currentChatUser) => user.id === currentChatUser.id,
          ),
      );
      setAllUsers(otherUsers);
    });
  }, [currentChatUsers]);

  // 모든 유저 중 접속중인 유저 불러오기
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

  return (
    <styled.ModalOverlay onClick={handleOverlayClick}>
      <styled.ModalContainer>
        <styled.ModalHeader>초대하기</styled.ModalHeader>
        <styled.ModalContent>
          <styled.ParticipantsWrapper>
            <styled.ParticipantsGrid>
              {allUsers.map((user, index) => (
                <UserItem key={index}>
                  <ProfileImage
                    // src="/assets/img/HarryPotter.png"
                    src={user.picture}
                    alt="Profile"
                  />
                  <UserInfo>
                    <Username>
                      {user.name}{' '}
                      {getStatusCircleColor(user.name) ? (
                        <Emoji>🟢</Emoji>
                      ) : (
                        <Emoji>🔴</Emoji>
                      )}
                    </Username>
                    <UserDormitory>그리핀도르</UserDormitory>
                  </UserInfo>
                  <styled.InviteIcon />
                </UserItem>
              ))}
            </styled.ParticipantsGrid>
          </styled.ParticipantsWrapper>
        </styled.ModalContent>
        <styled.CloseButton onClick={onClose}>X</styled.CloseButton>
      </styled.ModalContainer>
    </styled.ModalOverlay>
  );
};

export default InviteToChatRoomModal;
