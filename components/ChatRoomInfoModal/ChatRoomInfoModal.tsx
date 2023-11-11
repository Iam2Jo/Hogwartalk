// ChatRoomInfoModal.js
import React from 'react';
import * as styled from './ChatRoomInfoModal.styles';
import {
  UserItem,
  ProfileImage,
  UserInfo,
  Username,
  Emoji,
  UserDormitory,
} from '../FriendSearchToggle/FriendSearchToggle.styles';

interface Participant {
  id: number;
  name: string;
}

interface ChatRoomInfoModalProps {
  title?: string;
  maxParticipants?: number;
  host?: string;
  creationDate?: string;
  participants?: Participant[];
  isOpen: boolean;
  onClose: () => void;
}

const ChatRoomInfoModal: React.FC<ChatRoomInfoModalProps> = ({
  title,
  maxParticipants,
  host,
  creationDate,
  participants,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <styled.ModalOverlay onClick={handleOverlayClick}>
      <styled.ModalContainer>
        <styled.ModalHeader>채팅방 정보</styled.ModalHeader>
        <styled.ModalContent>
          <styled.TopWrapper>
            <styled.ModalLabel>채팅방 제목</styled.ModalLabel>
            <styled.ModalValue>{title}</styled.ModalValue>
          </styled.TopWrapper>

          <styled.MiddleWrapper>
            <styled.ModalLabel>최대 인원수</styled.ModalLabel>
            <styled.ModalLabel>호스트</styled.ModalLabel>
            <styled.ModalLabel>채팅방 개설일</styled.ModalLabel>

            <styled.ModalValue>{maxParticipants}</styled.ModalValue>
            <styled.ModalValue>{host}</styled.ModalValue>
            <styled.ModalValue>{creationDate}</styled.ModalValue>
          </styled.MiddleWrapper>

          <styled.ModalLabel>참여자 목록</styled.ModalLabel>
          <styled.ParticipantsWrapper>
            <styled.ParticipantsGrid>
              {participants.map((participant) => (
                <UserItem key={participant.id}>
                  <ProfileImage
                    src="/assets/img/HarryPotter.png"
                    alt="Profile"
                  />
                  <UserInfo>
                    <Username>
                      {participant.name} <Emoji>🟢</Emoji>
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
