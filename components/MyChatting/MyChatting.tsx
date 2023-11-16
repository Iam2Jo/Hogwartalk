'use client';

import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import * as styled from './MyChatting.styles';
import Link from 'next/link';
import { getToken } from '@utils/service';
import UserIcon from '@assets/icon/UserIcon.svg';

// import { ResponseValue } from '@/@types/RESTAPI/findMyChatting.types';
type ResponseValue = any;

const MyChatting = () => {
  const SERVER_KEY = process.env.NEXT_PUBLIC_SERVER_KEY;
  const FIND_MY_CHAT_URL = process.env.NEXT_PUBLIC_FIND_MY_CHAT_URL;
  const [accessToken, setAccessToken] = useState('');
  const isBrowser = typeof window !== 'undefined';
  const [currentDormitory, setCurrentDormitory] = useState('');
  const headers = {
    'Content-Type': 'application/json',
    serverId: SERVER_KEY,
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  };

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
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    console.log('currentDormitory', currentDormitory);
  }, [currentDormitory]);

  return (
    <styled.MyChattingContainer>
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
              <Link
                href={
                  chat.name === 'gryffindor' ||
                  chat.name === 'slytherin' ||
                  chat.name === 'hufflepuff' ||
                  chat.name === 'ravenclaw'
                    ? `/selectDormitory/${chat.name}`
                    : `/club/${chat.id}&name=${chat.name}`
                }
              >
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

export default MyChatting;
