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
import { updateFirebaseData } from '@hooks/useFireFetch';
import { getToken } from '@utils/service';
import { getFirebaseDatabyKeyVal } from '@hooks/useFireFetch';

interface DormChatInfo {
  id: string | null;
  name: string | null;
  users: string[];
  isPrivate: boolean | null;
  updatedAt: string | null;
  host: string | null;
}

interface InviteToChatRoomModalProps {
  title: string;
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
  title,
  isOpen,
  onClose,
  chatId,
  setCurrentRoomChatInfo,
}: InviteToChatRoomModalProps) => {
  if (!isOpen) return null;

  const [allUsers, setAllUsers] = useState([]);
  const [currentChatUsers, setCurrentChatUsers] = useState<User[]>([]);
  const [invitedUsers, setInvitedUsers] = useState<InvitedUser[]>([]);
  const [accessToken, setAccessToken] = useState('');
  const SERVER_KEY = process.env.NEXT_PUBLIC_SERVER_KEY;
  const GET_ALL_USERS_URL = process.env.NEXT_PUBLIC_GET_ALL_USERS_URL;
  const GET_ALL_CHATTINGS_URL = process.env.NEXT_PUBLIC_GET_ALL_CHATTINGS_URL;
  const INVITE_TO_CHATROOM_URL = process.env.NEXT_PUBLIC_INVITE_TO_CHATROOM_URL;

  const headers = {
    'Content-Type': 'application/json',
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
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
        updateFirebaseData('chatInfo', title, response.data);
      })
      .then(() => {
        onClose();
      })
      .catch((error) => {
        console.error(`${invitedUsersName.join(', ')} 초대하기 실패!`, error);
      });

    setCurrentRoomChatInfo((prev) => ({
      ...prev,
      users: [...prev?.users, ...invitedUsersName],
    }));
  };
  useEffect(() => {
    const token = getToken();
    setAccessToken(token);
  }, []);

  // 현재 채팅에 있는 유저 불러오기
  useEffect(() => {
    axios
      .get(GET_ALL_CHATTINGS_URL, { headers })
      .then((response) => {
        const chats = response.data.chats;
        console.log('chats: ', chats, chatId);
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
      .then(async (response) => {
        console.log('모든 유저: ', response.data);
        console.log('현재 채팅에 있는 유저: ', currentChatUsers);

        const otherUsers = response.data.filter(
          (user) =>
            !currentChatUsers.some(
              (currentChatUser) => user.id === currentChatUser.id,
            ),
        );

        const allUsersFromDB = await getFirebaseDatabyKeyVal('users');
        const tmpArr = otherUsers.map((userRes) => {
          const matchingData = allUsersFromDB.find(
            (userDB) => userDB.id === userRes.id,
          );

          return matchingData
            ? { ...userRes, class: matchingData.class }
            : userRes;
        });
        setAllUsers(tmpArr);
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
                      <UserDormitory>{user.class}</UserDormitory>
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
