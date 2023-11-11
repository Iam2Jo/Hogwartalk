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
import { useSetRecoilState } from 'recoil';
import * as dormChatInfo from '@/recoil/dormChatInfo';
import axios from 'axios';

interface ChatRoomInfoModalProps {
  title?: string;
  numParticipants?: number;
  host?: string;
  creationDate?: string;
  participants?: string[];
  isOpen: boolean;
  onClose: () => void;
  onTitleChange: (newTitle: string) => void;
  isConnected: string[];
}

const ChatRoomInfoModal = ({
  title,
  numParticipants,
  host,
  creationDate,
  participants,
  isOpen,
  onClose,
  onTitleChange,
  isConnected,
}: ChatRoomInfoModalProps) => {
  if (!isOpen) return null;
  const SERVER_KEY = '660d616b';
  const ACCESS_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGQ2MTZiOmhhcnJ5cG90dGVyIiwiaWF0IjoxNjk5MzQ1NDkzLCJleHAiOjE2OTk5NTAyOTN9.b5s4_9f-pVBj9ki17SXc6VvoiApMJZCJXfk5G2wskyo';
  const GET_MY_INFO_URL = 'https://fastcampus-chat.net/auth/me';

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    serverId: SERVER_KEY,
  };

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(title || '');
  const [isHost, setIsHost] = useState(false);

  const setGryffindorChatInfo = useSetRecoilState(
    dormChatInfo.gryffindorChatInfoState,
  );

  useEffect(() => {
    setNewTitle(title || '');
  }, [title]);

  const handleTitleEditClick = () => {
    setIsEditingTitle(true);
  };

  const handleTitleSaveClick = () => {
    onTitleChange(newTitle);
    setIsEditingTitle(false);
    setGryffindorChatInfo((prevChatInfo) => {
      const newChatInfo = {
        ...prevChatInfo,
        name: newTitle,
      };

      return newChatInfo;
    });
  };

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getStatusCircleColor = (participant: string): boolean => {
    return isConnected.includes(participant);
  };

  useEffect(() => {
    axios.get(GET_MY_INFO_URL, { headers }).then((res) => {
      console.log('현재 유저 이름: ', res.data.user.name);
      console.log('호스트 유저 이름: ', host);

      if (host === res.data.user.name) {
        setIsHost(true);
      }
    });
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
            {isEditingTitle ? (
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
            )}
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
              {participants.map((participant, index) => (
                <UserItem key={index}>
                  <ProfileImage
                    src="/assets/img/HarryPotter.png"
                    alt="Profile"
                  />
                  <UserInfo>
                    <Username>
                      {participant}{' '}
                      {getStatusCircleColor(participant) ? (
                        <Emoji>🟢</Emoji>
                      ) : (
                        <Emoji>🔴</Emoji>
                      )}
                    </Username>
                    <UserDormitory>그리핀도르</UserDormitory>
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
