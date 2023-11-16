import { useEffect, useRef } from 'react';
import isEqual from 'lodash/isEqual';

export const useFetchMessages = async (chatSocket) => {
  try {
    await chatSocket.emit('fetch-messages');
    console.log('C->S 이전 대화목록 가져오기 성공!');
  } catch (error) {
    console.error('C->S 이전 대화목록 가져오기 실패!', error);
  }
};

export const useMessageToClient = async (chatSocket, handleMessageToClient) => {
  try {
    await chatSocket.on('message-to-client', handleMessageToClient);
  } catch (error) {
    console.error('S->C 메시지 전송 실패!', error);
  }
};

export const useMessagesToClient = async (
  chatSocket,
  handleMessagesToClient,
) => {
  try {
    await chatSocket.on('messages-to-client', handleMessagesToClient);
  } catch (error) {
    console.error('S->C 이전 대화목록 가져오기 실패!', error);
  }
};

export const useScrollToBottom = (messageContainerRef, previousMessages) => {
  const prevMessagesRef = useRef(previousMessages);

  useEffect(() => {
    // 현재 상태와 이전 상태를 비교해서 변화가 있을 때만 스크롤 맨 아래로 이동
    const messagesChanged = !isEqual(previousMessages, prevMessagesRef.current);

    if (messagesChanged && messageContainerRef.current) {
      // 새로운 메시지가 추가될 때마다 스크롤을 맨 아래로 이동
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }

    prevMessagesRef.current = previousMessages;
  }, [previousMessages, messageContainerRef]);
};

export const useFetchUsers = async (chatSocket) => {
  try {
    await chatSocket.emit('users');
    console.log('C->S 접속 상태 유저 목록 fetch 성공!');
  } catch (error) {
    console.error('C->S 접속 상태 유저 목록 fetch 실패!', error);
  }
};

export const usePullUsers = async (chatSocket, handlePullUsers) => {
  try {
    await chatSocket.on('users-to-client', handlePullUsers);
  } catch (error) {
    console.error('S->C 접속 상태 유저 목록 pull 실패!', error);
  }
};

export const useJoinUsers = async (chatSocket, handleJoinUsers) => {
  try {
    await chatSocket.on('join', handleJoinUsers);
  } catch (error) {
    console.error('S->C 유저 입장 정보 불러오기 실패!', error);
  }
};

export const useLeaveUsers = async (chatSocket, handleLeaveUsers) => {
  try {
    await chatSocket.on('leave', handleLeaveUsers);
  } catch (error) {
    console.error('S->C 유저 퇴장 정보 불러오기 실패!', error);
  }
};

export const useServerFetchUsers = async (chatSocket) => {
  try {
    await chatSocket.emit('users-server');
    console.log('C->S 접속 상태 유저 목록 fetch 성공!(server)');
  } catch (error) {
    console.error('C->S 접속 상태 유저 목록 fetch 실패!(server)', error);
  }
};

export const useServerPullUsers = async (chatSocket, handlePullUsers) => {
  try {
    await chatSocket.on('users-server-to-client', handlePullUsers);
  } catch (error) {
    console.error('S->C 접속 상태 유저 목록 pull 실패!(server)', error);
  }
};
