'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
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
import { useSearchParams } from 'next/navigation';
import cutStringAfterColon from '@/utils/cutStringAfterColon';
import { useRouter } from 'next/navigation';

const Dormitory = ({ chatId, dormName }) => {
  const [currentChatId, setCurrentChatId] = useState(chatId);
  const [currentDormName, setCurrentDormName] = useState(dormName);

  const params = useSearchParams();
  const router = useRouter();

  const queryString = params.get('id');
  const chatName = queryString?.split('?name=')[1];

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
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  // const [newDormName, setNewDormName] = useState(dormName);

  // const gryffindorChatInfo = useRecoilValue(gryffindorChatInfoState);
  // const hufflepuffChatInfo = useRecoilValue(hufflepuffChatInfoState);
  // const ravenclawChatInfo = useRecoilValue(ravenclawChatInfoState);
  // const slytherinChatInfo = useRecoilValue(slytherinChatInfoState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getFirebaseDatabyKeyVal('chatInfo', 'name', dormName);
        console.log('firebase chatInfo:  ', res);
        setCurrentDormChatInfo(res[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  // const { name, users, updatedAt, host } = currentDormChatInfo;
  const modalData = {
    title: currentDormChatInfo?.name,
    numParticipants: currentDormChatInfo?.users.length,
    host: currentDormChatInfo?.host,
    creationDate: extractDateFromString(currentDormChatInfo?.updatedAt),
    participants: currentDormChatInfo?.users,
  };
  // const [chatRoomTitle, setChatRoomTitle] = useState(modalData.title);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messageContainerRef = useRef<HTMLDivElement | null>(null);
  const SERVER_KEY = process.env.NEXT_PUBLIC_SERVER_KEY;
  const [accessToken, setAccessToken] = useState('');

  const CHATROOM_LEAVE_URL = process.env.NEXT_PUBLIC_CHATROOM_LEAVE_URL;
  const myId = findMyId(accessToken);
  const headers = {
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    serverId: SERVER_KEY,
  };
  // const chatSocket = io(`https://fastcampus-chat.net/chat?chatId=${chatId}`, {
  //   extraHeaders: headers,
  // });
  const chatSocket = useMemo(() => {
    return io(`https://fastcampus-chat.net/chat?chatId=${chatId}`, {
      extraHeaders: headers,
    });
  }, [accessToken]);

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

  const handleMessageToClient = (messageObject: any) => {
    console.log(messageObject);
    console.log('S->C 메시지 전송 성공!');
  };

  const handleMessagesToClient = (messageObject) => {
    setPreviousMessages(messageObject.messages);
    console.log('S->C 이전 대화목록 가져오기 성공!');
  };

  const handlePullUsers = (response) => {
    console.log('접속 상태 유저 목록: ', response.users);
    console.log('S->C 접속 상태 유저 목록 pull 성공!');
    setIsConnected(response.users);
  };

  const handleJoinUsers = (response) => {
    console.log(
      cutStringAfterColon(response.joiners[0].id),
      '님이 입장하셨습니다.',
    );
    setIsConnected(response.users);
    console.log('S->C 유저 입장 정보 불러오기 성공!');
  };

  const handleLeaveUsers = (response) => {
    console.log(response.leaver, '님이 퇴장하셨습니다.');
    setIsConnected(response.users);
    console.log('S->C 유저 퇴장 정보 불러오기 성공!');
  };

  useEffect(() => {
    const fetchDataAndAttachListeners = async () => {
      try {
        await useFetchMessages(chatSocket);
        await useFetchUsers(chatSocket);
        useMessageToClient(chatSocket, handleMessageToClient);
        usePullUsers(chatSocket, handlePullUsers);
        useJoinUsers(chatSocket, handleJoinUsers);
        useLeaveUsers(chatSocket, handleLeaveUsers);
      } catch (error) {
        console.error(
          '데이터 가져오기 또는 이벤트 리스너 추가 중 오류 발생:',
          error,
        );
      }
    };

    fetchDataAndAttachListeners();

    return () => {
      console.log('클린업 함수 호출됨');
      chatSocket.off('message-to-client', handleMessageToClient);
      chatSocket.off('users-to-client', handlePullUsers);
      chatSocket.off('join', handleJoinUsers);
      chatSocket.off('leave', handleLeaveUsers);
    };
  }, [
    chatSocket,
    handleMessageToClient,
    handlePullUsers,
    handleJoinUsers,
    handleLeaveUsers,
  ]);

  useEffect(() => {
    useMessagesToClient(chatSocket, handleMessagesToClient);

    return () => {
      chatSocket.off('messages-to-client', handleMessagesToClient);
    };
  }, [chatSocket, setPreviousMessages]);

  useScrollToBottom(messageContainerRef, previousMessages);

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
  const openInfoModal = () => {
    setIsInfoModalOpen(true);
    setIsOpen(false);
  };

  const closeInfoModal = () => {
    setIsInfoModalOpen(false);
    setIsOpen(false);
  };

  // const handleTitleChange = (newTitle) => {
  //   setChatRoomTitle(newTitle);
  // };

  const openInviteModal = () => {
    const isDisabled = [
      'gryffindor',
      'ravenclaw',
      'hufflepuff',
      'slytherin',
    ].includes(dormName);

    if (!isDisabled) {
      setIsInviteModalOpen(true);
    }
  };

  const closeInviteModal = () => {
    setIsInviteModalOpen(false);
  };

  const leaveChatRoom = () => {
    if (
      dormName === 'gryffindor' ||
      dormName === 'ravenclaw' ||
      dormName === 'hufflepuff' ||
      dormName === 'slytherin'
    ) {
      alert('해당 채팅방은 나갈 수 없습니다.');
      return;
    }

    try {
      axios.patch(CHATROOM_LEAVE_URL, { chatId }, { headers }).then((res) => {
        alert(res.data.message);
        router.push('/club');
      });
    } catch (error) {
      console.error('채팅방 나가기 실패!', error);
    }
  };

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (e.target === e.currentTarget) {
      setIsOpen(!isOpen);
    }
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
        // onTitleChange={handleTitleChange}
        isOpen={isInfoModalOpen}
        onClose={closeInfoModal}
        isConnected={isConnected}
        dormName={dormName}
        // setDormName={setNewDormName}
      />
      <InviteToChatRoomModal
        title={modalData.title}
        isOpen={isInviteModalOpen}
        onClose={closeInviteModal}
        chatId={chatId}
        setCurrentRoomChatInfo={setCurrentDormChatInfo}
      />
      {isOpen ? (
        <styled.ModalOverlay onClick={handleOverlayClick}>
          <styled.MoreItemContainer>
            <styled.Button onClick={openInfoModal}>채팅방 정보</styled.Button>
            <styled.Line />
            <styled.Button onClick={leaveChatRoom}>나가기</styled.Button>
          </styled.MoreItemContainer>
        </styled.ModalOverlay>
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
