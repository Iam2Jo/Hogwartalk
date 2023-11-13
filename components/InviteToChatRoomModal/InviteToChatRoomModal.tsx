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

interface DormChatInfo {
  id: string | null;
  name: string | null;
  users: string[];
  isPrivate: boolean | null;
  updatedAt: string | null;
  host: string | null;
}

interface InviteToChatRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  chatId: string;
  setCurrentRoomChatInfo: React.Dispatch<React.SetStateAction<DormChatInfo>>;
}

interface User {
  id: string;
  name: string;
  picture: string;
}

interface InvitedUser {
  id: string;
  name: string;
}

const InviteToChatRoomModal = ({
  isOpen,
  onClose,
  chatId,
  setCurrentRoomChatInfo,
}: InviteToChatRoomModalProps) => {
  if (!isOpen) return null;

  const [allUsers, setAllUsers] = useState([]);
  const [currentChatUsers, setCurrentChatUsers] = useState<User[]>([]);
  const [invitedUsers, setInvitedUsers] = useState<InvitedUser[]>([]);

  const SERVER_KEY = '660d616b';
  const ACCESS_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGQ2MTZiOmhlcm1pb25lIiwiaWF0IjoxNjk5NDIzOTI4LCJleHAiOjE3MDAwMjg3Mjh9.9FA24mkoipWSd4KlpxTX0L8mKmJj7LAVd_XEcW1Xt7w';
  const GET_ALL_USERS_URL = 'https://fastcampus-chat.net/users';
  const GET_ALL_CHATTINGS_URL = 'https://fastcampus-chat.net/chat/all';
  const INVITE_TO_CHATROOM_URL = 'https://fastcampus-chat.net/chat/invite';

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    serverId: SERVER_KEY,
  };

  // 모듈화
  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const inviteToChatRoom = (invitedUsers: InvitedUser[]) => {
    const invitedUsersId = invitedUsers.map((user) => user.id);
    const invitedUsersName = invitedUsers.map((user) => user.name);

    axios
      .patch(
        INVITE_TO_CHATROOM_URL,
        { chatId, users: invitedUsersId },
        { headers },
      )
      .then((response) => {
        alert(`${invitedUsersName.join(', ')} 초대하기 성공!`);
        onClose();
      })
      .catch((error) => {
        console.error(`${invitedUsersName.join(', ')} 초대하기 실패!`, error);
      });

    setCurrentRoomChatInfo((prev) => ({
      ...prev,
      users: [...prev.users, ...invitedUsersName],
    }));
  };

  // 현재 채팅에 있는 유저 불러오기
  useEffect(() => {
    axios
      .get(GET_ALL_CHATTINGS_URL, { headers })
      .then((response) => {
        const chats = response.data.chats;
        const { users } = chats?.find((room) => room.id === chatId);
        setCurrentChatUsers(users);
      })
      .catch((error) => {
        console.error('현재 채팅에 있는 유저 불러오기 실패!', error);
      });
  }, []);

  // 초대 가능한 유저 불러오기(현재 채팅에 없는 사람만)
  useEffect(() => {
    axios
      .get(GET_ALL_USERS_URL, { headers })
      .then((response) => {
        console.log('모든 유저: ', response.data);
        console.log('현재 채팅에 있는 유저: ', currentChatUsers);

        const otherUsers = response.data.filter(
          (user) =>
            !currentChatUsers.some(
              (currentChatUser) => user.id === currentChatUser.id,
            ),
        );
        setAllUsers(otherUsers);
      })
      .catch((error) => {
        console.error('초대 가능한 유저 불러오기 실패!', error);
      });
  }, [currentChatUsers]);

  return (
    <styled.ModalOverlay onClick={handleOverlayClick}>
      <styled.ModalContainer>
        <styled.ModalHeader>
          사용자 초대하기
          <styled.InviteAllIcon
            onClick={() => inviteToChatRoom(invitedUsers)}
          />
        </styled.ModalHeader>

        {invitedUsers.length > 0 && (
          <styled.InvitedUsersWrapper>
            <styled.InvitedUsersGrid>
              {invitedUsers.map((invitedUser, index) => (
                <styled.UserInfo key={index}>
                  <Username>{invitedUser.name}</Username>
                  <styled.CancelButton
                    onClick={() => {
                      const updatedInvitedUsers = invitedUsers.filter(
                        (user) => user.id !== invitedUser.id,
                      );
                      setInvitedUsers(updatedInvitedUsers);
                    }}
                  >
                    X
                  </styled.CancelButton>
                </styled.UserInfo>
              ))}
            </styled.InvitedUsersGrid>
          </styled.InvitedUsersWrapper>
        )}
        <styled.ModalContent>
          <styled.ParticipantsWrapper>
            <styled.ParticipantsGrid>
              {allUsers
                .filter(
                  (user) =>
                    !invitedUsers.some(
                      (invitedUser) => invitedUser.id === user.id,
                    ),
                )
                .map((user, index) => (
                  <UserItem key={index}>
                    <ProfileImage
                      // src="/assets/img/HarryPotter.png"
                      src={user.picture}
                      alt="Profile"
                    />
                    <UserInfo>
                      <Username>{user.name}</Username>
                      <UserDormitory>그리핀도르</UserDormitory>
                    </UserInfo>
                    <styled.InviteIcon
                      onClick={() =>
                        setInvitedUsers((prevInvitedUsers) => [
                          ...prevInvitedUsers,
                          { id: user.id, name: user.name },
                        ])
                      }
                    />
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
