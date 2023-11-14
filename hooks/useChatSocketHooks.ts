import { useEffect, useRef } from 'react';
import isEqual from 'lodash/isEqual';
import cutStringAfterColon from '@/utils/cutStringAfterColon';

export const useFetchMessages = (chatSocket) => {
  useEffect(() => {
    try {
      chatSocket.emit('fetch-messages');
      console.log('C->S 이전 대화목록 가져오기 성공!');
    } catch (error) {
      console.error('C->S 이전 대화목록 가져오기 실패!', error);
    }
  }, [chatSocket]);
};

export const useMessageToClient = (chatSocket) => {
  useEffect(() => {
    try {
      chatSocket.on('message-to-client', (messageObject: any) => {
        console.log(messageObject);
        console.log('S->C 메시지 전송 성공!');
      });
    } catch (error) {
      console.error('S->C 메시지 전송 실패!', error);
    }
  }, [chatSocket]);
};

export const useMessagesToClient = (chatSocket, setPreviousMessages) => {
  useEffect(() => {
    try {
      chatSocket.on('messages-to-client', (messageObject: any) => {
        setPreviousMessages(messageObject.messages);
        console.log('S->C 이전 대화목록 가져오기 성공!');
      });
    } catch (error) {
      console.error('S->C 이전 대화목록 가져오기 실패!', error);
    }
  }, [chatSocket, setPreviousMessages]);
};

export const useScrollToBottom = (messageContainerRef, previousMessages) => {
  const prevMessagesRef = useRef(previousMessages);

  useEffect(() => {
    // 현재 상태와 이전 상태를 비교해서 변화가 있을 때만 스크롤 맨 아래로 이동
    const messagesChanged = !isEqual(previousMessages, prevMessagesRef.current);
    if (messagesChanged && messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
    prevMessagesRef.current = previousMessages;
  }, [previousMessages]);
};

export const useFetchUsers = (chatSocket) => {
  useEffect(() => {
    try {
      chatSocket.emit('users');
      console.log('C->S 접속 상태 유저 목록 fetch 성공!');
    } catch (error) {
      console.error('C->S 접속 상태 유저 목록 fetch 실패!', error);
    }
  }, [chatSocket]);
};

export const usePullUsers = (chatSocket, setIsConnected) => {
  useEffect(() => {
    try {
      chatSocket.on('users-to-client', (response) => {
        console.log('접속 상태 유저 목록: ', response.users);
        console.log('S->C 접속 상태 유저 목록 pull 성공!');
        setIsConnected(response.users);
      });
    } catch (error) {
      console.error('S->C 접속 상태 유저 목록 pull 실패!', error);
    }
  }, [chatSocket]);
};

export const useJoinUsers = (chatSocket, setIsConnected) => {
  try {
    chatSocket.on('join', (response) => {
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
};

export const useLeaveUsers = (chatSocket, setIsConnected) => {
  try {
    chatSocket.on('leave', (response) => {
      console.log(response.leaver, '님이 퇴장하셨습니다.');
      setIsConnected(response.users);
      console.log('S->C 유저 퇴장 정보 불러오기 성공!');
    });
  } catch (error) {
    console.error('S->C 유저 퇴장 정보 불러오기 실패!', error);
  }
};
