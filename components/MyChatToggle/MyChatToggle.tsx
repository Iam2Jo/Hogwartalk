'use client';

import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import * as styled from './MyChatToggle.styles';
import Link from 'next/link';
import { getToken } from '@utils/service';
import UserIcon from '@assets/icon/UserIcon.svg';

type ResponseValue = any;

interface MyChatToggleProps {
  isVisible: boolean;
  onClose: () => void;
}

const MyChatToggle: React.FC<MyChatToggleProps> = ({ isVisible, onClose }) => {
  const SERVER_KEY = process.env.NEXT_PUBLIC_SERVER_KEY;
  const FIND_MY_CHAT_URL = process.env.NEXT_PUBLIC_FIND_MY_CHAT_URL;
  const [accessToken, setAccessToken] = useState('');

  const headers = {
    'Content-Type': 'application/json',
    serverId: SERVER_KEY,
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  };
  const [currentDormitory, setCurrentDormitory] = useState('');
  const isBrowser = typeof window !== 'undefined';

  const [data, setData] = useState<ResponseValue | null>(null);

  // Polling 방식
  const fetchData = () => {
    axios
      .get(FIND_MY_CHAT_URL, { headers })
      .then((response) => {
        console.log('내 채팅방 조회 성공!');
        setData(response.data);
      })
      .catch((error) => {
        console.error('내 채팅방 조회 실패!', error);
      });
  };
  useEffect(() => {
    if (isBrowser) {
      const currentUrl = window.location.href;
      const currentDormitory = currentUrl.substring(
        currentUrl.lastIndexOf('/') + 1,
      );
      setCurrentDormitory(currentDormitory);
    }
  }, [isBrowser]);
  useEffect(() => {
    const token = getToken();
    setAccessToken(token);
  }, []);

  useEffect(() => {
    if (isVisible) {
      // 초기 데이터 불러오기
      fetchData();
      // 주기적으로 데이터 업데이트
      const intervalId = setInterval(() => {
        fetchData();
      }, 1000); // 5초마다 업데이트, 필요에 따라 조절 가능
      // 컴포넌트가 언마운트될 때 clearInterval로 인터벌 정리
      return () => clearInterval(intervalId);
    }
  }, [isVisible]); // 빈 배열을 전달하여 최초 한 번만 실행되도록 함

  useEffect(() => {
    console.log('currentDormitory', currentDormitory);
  }, [currentDormitory]);

  return (
    <styled.MyChattingContainer isVisible={isVisible}>
      <styled.CloseButton onClick={onClose}>
        <img src="/assets/icons/close.svg" alt="Close" />
      </styled.CloseButton>
      <styled.Label>
        <styled.Title>참여중인 대화방</styled.Title>
        <styled.Length>{data?.chats?.length}</styled.Length>
      </styled.Label>
      <styled.MyChattingWrapper>
        {data?.chats
          ?.sort(
            (a, b) =>
              (new Date(b.updatedAt) as any) - (new Date(a.updatedAt) as any),
          )
          .map((chat) => {
            const messageDate = new Date(chat.updatedAt);
            const timeString = messageDate.toLocaleString('en-US', {
              timeZone: 'Asia/Seoul',
              hour12: false,
              hour: 'numeric',
              minute: 'numeric',
            });

            return (
              <Link key={chat.id} href={`/club/${chat.id}&name=${chat.name}`}>
                <styled.MyChatting
                  $isCurrentChat={chat.name === currentDormitory}
                >
                  <styled.ChattingInfo>
                    <div style={{ display: 'flex', gap: '0.3rem' }}>
                      <styled.ChatName
                        $isCurrentChat={chat.name === currentDormitory}
                      >
                        {chat.name}
                      </styled.ChatName>
                      <styled.IconWrapper>
                        <UserIcon />
                      </styled.IconWrapper>

                      <styled.ChatUsersLength>
                        {chat.users.length}
                      </styled.ChatUsersLength>
                    </div>
                    <styled.ChatTime
                      $isCurrentChat={chat.name === currentDormitory}
                    >
                      {timeString}
                    </styled.ChatTime>
                  </styled.ChattingInfo>
                  <div style={{ gap: '1rem' }}>
                    {chat.latestMessage ? (
                      <>
                        <styled.LatestMessage
                          $isCurrentChat={chat.name === currentDormitory}
                        >
                          {chat.latestMessage.text}
                        </styled.LatestMessage>
                      </>
                    ) : (
                      <>
                        <styled.LatestMessage
                          $isCurrentChat={chat.name === currentDormitory}
                        >
                          ㅤ
                        </styled.LatestMessage>
                      </>
                    )}
                  </div>
                </styled.MyChatting>
              </Link>
            );
          })}
      </styled.MyChattingWrapper>
    </styled.MyChattingContainer>
  );
};

export default MyChatToggle;
