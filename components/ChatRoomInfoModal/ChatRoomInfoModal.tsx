import React, { useEffect, useState } from 'react';
import * as styled from './ChatRoomInfoModal.styles';
import {
  UserItem,
  ProfileImage,
  UserInfo,
  Username,
  Emoji,
  UserDormitory,
} from '../FriendSearchToggle/FriendSearchToggle.styles';
// import { useSetRecoilState } from 'recoil';
// import * as dormChatInfo from '@/recoil/dormChatInfo';
import axios from 'axios';
import {
  updateFirebaseData,
  getFirebaseDatabyKeyVal,
} from '@hooks/useFireFetch';
import { getToken } from '@utils/service';
interface User {
  id: string;
  picture: string;
  username: string;
  class?: string;
}

interface ChatRoomInfoModalProps {
  title?: string;
  numParticipants?: number;
  host?: string;
  creationDate?: string;
  participants?: User[];
  isOpen: boolean;
  onClose: () => void;
  // onTitleChange: (newTitle: string) => void;
  isConnected: string[];
  dormName: string;
  // setDormName: any;
}

const ChatRoomInfoModal = ({
  title,
  numParticipants,
  host,
  creationDate,
  participants,
  isOpen,
  onClose,
  // onTitleChange,
  isConnected,
  dormName,
}: // setDormName,
ChatRoomInfoModalProps) => {
  if (!isOpen) return null;

  const SERVER_KEY = process.env.NEXT_PUBLIC_SERVER_KEY;
  const GET_MY_INFO_URL = process.env.NEXT_PUBLIC_GET_MY_INFO_URL;
  const [accessToken, setAccessToken] = useState('');
  const headers = {
    'Content-Type': 'application/json',
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    serverId: SERVER_KEY,
  };

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(title || '');
  const [isHost, setIsHost] = useState(false);
  const [chatInfo, setChatInfo] = useState({});
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const token = getToken();
    setAccessToken(token);
  }, []);

  useEffect(() => {
    getFirebaseDatabyKeyVal('chatInfo', 'name', dormName).then((res) => {
      console.log('res: ', res);
      setChatInfo(res[0]);
    });
  }, []);

  useEffect(() => {
    setNewTitle(title || '');
  }, [title]);

  const handleTitleEditClick = () => {
    setIsEditingTitle(true);
  };

  // const handleTitleSaveClick = async () => {
  //   onTitleChange(newTitle);
  //   setIsEditingTitle(false);

  //   const newChatInfo = {
  //     ...chatInfo,
  //     name: newTitle,
  //   };

  //   await updateFirebaseData('chatInfo', dormName, newChatInfo.name);
  // };

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // 모듈화
  const getStatusCircleColor = (participant: string): boolean => {
    return isConnected?.includes(participant);
  };

  useEffect(() => {
    axios
      .get(GET_MY_INFO_URL, { headers })
      .then((response) => {
        console.log('현재 유저 이름: ', response.data.user.name);
        console.log('호스트 유저 이름: ', host);

        if (host === response.data.user.name) {
          setIsHost(true);
        }
      })
      .catch((error) => {
        console.error('현재 유저 정보 fetch 실패!', error);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allUsersFromDB = await getFirebaseDatabyKeyVal('users');
        const tmpArr = participants.map(async (userRes) => {
          const matchingData = allUsersFromDB.find(
            (userDB) => userDB.id === userRes.id,
          );

          return matchingData
            ? { ...userRes, class: matchingData.class }
            : userRes;
        });

        const updatedUsers = await Promise.all(tmpArr);
        setUsers(updatedUsers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <styled.ModalOverlay onClick={handleOverlayClick}>
      <styled.ModalContainer>
        <styled.ModalHeader>
          채팅방 정보{' '}
          {isEditingTitle ? null : isHost ? (
            <styled.EditIcon onClick={handleTitleEditClick} />
          ) : null}
        </styled.ModalHeader>
        <styled.ModalContent>
          <styled.TopWrapper>
            <styled.ModalLabel>채팅방 제목</styled.ModalLabel>
            {/* {isEditingTitle ? (
              <styled.InputWrapper>
                <styled.TitleInput
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
                <styled.SaveIcon onClick={handleTitleSaveClick} />
              </styled.InputWrapper>
            ) : (
              <styled.ModalValue>{newTitle}</styled.ModalValue>
            )} */}
            <styled.ModalValue>{newTitle}</styled.ModalValue>
          </styled.TopWrapper>

          <styled.MiddleWrapper>
            <styled.ModalLabel>인원수</styled.ModalLabel>
            <styled.ModalLabel>호스트</styled.ModalLabel>
            <styled.ModalLabel>채팅방 개설일</styled.ModalLabel>

            <styled.ModalValue>{numParticipants}</styled.ModalValue>
            <styled.ModalValue>{host}</styled.ModalValue>
            <styled.ModalValue>{creationDate}</styled.ModalValue>
          </styled.MiddleWrapper>

          <styled.ModalLabel>참여자 목록</styled.ModalLabel>
          <styled.ParticipantsWrapper>
            <styled.ParticipantsGrid>
              {users?.map((user, index) => (
                <UserItem key={index}>
                  <ProfileImage
                    src="/assets/img/HarryPotter.png"
                    alt="Profile"
                  />
                  <UserInfo>
                    <Username>
                      {user.username}{' '}
                      {getStatusCircleColor(user.username) ? (
                        <Emoji>🟢</Emoji>
                      ) : (
                        <Emoji>🔴</Emoji>
                      )}
                    </Username>
                    <UserDormitory>{user.class}</UserDormitory>
                  </UserInfo>
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

export default ChatRoomInfoModal;
