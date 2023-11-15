'use client';

import React, { useState, useRef, useEffect } from 'react';
import { findMyId } from '@hooks/findMyId';
import { io } from 'socket.io-client';
import * as styled from './Dormitory.styles';
import {
  useFetchMessages,
  useMessageToClient,
  useMessagesToClient,
  useScrollToBottom,
  useFetchUsers,
  usePullUsers,
  useJoinUsers,
  useLeaveUsers,
} from '@hooks/useChatSocketHooks';
import { scrollToBottom, handleScroll } from '@utils/scrollUtils';
import { RequestData } from '@/@types/Socket/emit/messageToServer.types';
import { Message } from '@/@types/Socket/on/messagesToClient.types';
import axios from 'axios';
import extractDateFromString from '@/utils/extractDateFromString';
import ChatRoomInfoModal from '@/components/ChatRoomInfoModal/ChatRoomInfoModal';
import InviteToChatRoomModal from '@components/InviteToChatRoomModal/InviteToChatRoomModal';
import { getToken } from '@utils/service';
import { getFirebaseDatabyKeyVal } from '@hooks/useFireFetch';

const Dormitory = ({ chatId, dormName }) => {
  const [text, setText] = useState<RequestData>('');
  const [previousMessages, setPreviousMessages] = useState<Message[]>([]);
  const [isAtBottom, setIsAtBottom] = useState(true);
  // type으로 빼면 오류가 나서 일단 초기값을 넣어둠
  const [currentDormChatInfo, setCurrentDormChatInfo] = useState({
    id: '',
    name: '',
    users: [],
    isPrivate: false,
    updatedAt: '',
    host: '',
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState([]);

  // const gryffindorChatInfo = useRecoilValue(gryffindorChatInfoState);
  // const hufflepuffChatInfo = useRecoilValue(hufflepuffChatInfoState);
  // const ravenclawChatInfo = useRecoilValue(ravenclawChatInfoState);
  // const slytherinChatInfo = useRecoilValue(slytherinChatInfoState);

  useEffect(() => {
    getFirebaseDatabyKeyVal('chatInfo', 'name', dormName).then((res) => {
      console.log('res: ', res);
      setCurrentDormChatInfo(res[0]);
    });
  }, []);

  // const { name, users, updatedAt, host } = currentDormChatInfo;
  const modalData = {
    title: currentDormChatInfo.name,
    numParticipants: currentDormChatInfo.users.length,
    host: currentDormChatInfo.host,
    creationDate: extractDateFromString(currentDormChatInfo.updatedAt),
    participants: currentDormChatInfo.users,
  };
  const [chatRoomTitle, setChatRoomTitle] = useState(modalData.title);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messageContainerRef = useRef<HTMLDivElement | null>(null);
  const SERVER_KEY = process.env.REACT_APP_SERVER_KEY;
  const [accessToken, setAccessToken] = useState('');

  const CHATROOM_LEAVE_URL = process.env.REACT_APP_CHATROOM_LEAVE_URL;
  const myId = findMyId(accessToken);
  const headers = {
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    serverId: SERVER_KEY,
  };
  const chatSocket = io(`https://fastcampus-chat.net/chat?chatId=${chatId}`, {
    extraHeaders: headers,
  });

  const sendMessage = () => {
    try {
      if (text.trim() !== '') {
        chatSocket.emit('message-to-server', text);
        setText('');
        console.log('C->S 메시지 전송 성공!');
      }
    } catch (error) {
      console.error('C->S 메시지 전송 실패!', error);
    }
  };

  useFetchMessages(chatSocket);
  useMessageToClient(chatSocket);
  useMessagesToClient(chatSocket, setPreviousMessages);
  useScrollToBottom(messageContainerRef, previousMessages);
  useFetchUsers(chatSocket);
  // usePullUsers(chatSocket, setIsConnected);
  useJoinUsers(chatSocket, setIsConnected);
  useLeaveUsers(chatSocket, setIsConnected);

  useEffect(() => {
    const token = getToken();
    setAccessToken(token);
  }, []);

  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom(messagesEndRef);
    }
  }, [isAtBottom]);

  /********************************************************** */
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const openInfoModal = () => {
    setIsInfoModalOpen(true);
  };

  const closeInfoModal = () => {
    setIsInfoModalOpen(false);
  };

  const handleTitleChange = (newTitle) => {
    setChatRoomTitle(newTitle);
  };

  const openInviteModal = () => {
    setIsInviteModalOpen(true);
  };

  const closeInviteModal = () => {
    setIsInviteModalOpen(false);
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
  /********************************************************** */

  return (
    <styled.DormitoryContainer>
      <ChatRoomInfoModal
        title={modalData.title}
        numParticipants={modalData.numParticipants}
        host={modalData.host}
        creationDate={modalData.creationDate}
        participants={modalData.participants}
        onTitleChange={handleTitleChange}
        isOpen={isInfoModalOpen}
        onClose={closeInfoModal}
        isConnected={isConnected}
        dormName={dormName}
      />
      <InviteToChatRoomModal
        isOpen={isInviteModalOpen}
        onClose={closeInviteModal}
        chatId={chatId}
        setCurrentRoomChatInfo={setCurrentDormChatInfo}
      />
      {isOpen ? (
        <styled.MoreItemContainer>
          <styled.ButtonWrapper>
            <styled.Button onClick={openInfoModal}>채팅방 정보</styled.Button>
          </styled.ButtonWrapper>
          <styled.ButtonWrapper>
            <styled.Button onClick={leaveChatRoom}>나가기</styled.Button>
          </styled.ButtonWrapper>
        </styled.MoreItemContainer>
      ) : null}
      <styled.DormitoryHeader>
        <styled.TitleWrapper>
          <styled.Title>{dormName}</styled.Title>
          <styled.Badge onClick={openInviteModal}>
            <styled.PersonIcon />
            {currentDormChatInfo?.users.length}
          </styled.Badge>
        </styled.TitleWrapper>
        <styled.MoreIcon onClick={() => setIsOpen(!isOpen)} />
      </styled.DormitoryHeader>
      <styled.MessageContainer
        ref={messageContainerRef}
        onScroll={(e) => handleScroll(e, setIsAtBottom, messageContainerRef)}
      >
        {previousMessages.map((message) => {
          const messageDate = new Date(message.createdAt);
          const timeString = messageDate.toLocaleString('en-US', {
            timeZone: 'Asia/Seoul',
            hour12: false,
            hour: 'numeric',
            minute: 'numeric',
          });
          return (
            <styled.MessageWrapper
              key={message.id}
              $isCurrentUser={message.userId === myId}
            >
              <styled.MessageInfo>
                {message.userId !== myId && (
                  <styled.MessageUserId>{message.userId}</styled.MessageUserId>
                )}
                <styled.MessageTime>{timeString}</styled.MessageTime>
              </styled.MessageInfo>
              <div>
                <styled.MessageText $isCurrentUser={message.userId === myId}>
                  {message.text}
                </styled.MessageText>
              </div>
            </styled.MessageWrapper>
          );
        })}
        <div ref={messagesEndRef} />
      </styled.MessageContainer>
      <styled.ScrollToBottomButton
        onClick={() => scrollToBottom(messagesEndRef)}
        $isVisible={!isAtBottom}
      >
        <styled.BottomIcon />
      </styled.ScrollToBottomButton>
      <styled.InputWrapper>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <button onClick={sendMessage}>전송</button>
      </styled.InputWrapper>
    </styled.DormitoryContainer>
  );
};

export default Dormitory;
