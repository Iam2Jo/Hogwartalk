'use client';

import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import * as styled from './MyChatting.styles';
import Link from 'next/link';
// import { ResponseValue } from '@/@types/RESTAPI/findMyChatting.types';
type ResponseValue = any;

const MyChatting = () => {
  const SERVER_KEY = '660d616b';
  const FIND_MY_CHAT_URL = 'https://fastcampus-chat.net/chat';
  const ACCESS_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGQ2MTZiOmhlcm1pb25lIiwiaWF0IjoxNjk5NDIzOTI4LCJleHAiOjE3MDAwMjg3Mjh9.9FA24mkoipWSd4KlpxTX0L8mKmJj7LAVd_XEcW1Xt7w';

  const headers = {
    'Content-Type': 'application/json',
    serverId: SERVER_KEY,
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };

  const [data, setData] = useState<ResponseValue | null>(null);
  const currentUrl = window.location.href;
  const currentDormitory = currentUrl.substring(
    currentUrl.lastIndexOf('/') + 1,
  );
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
    // 초기 데이터 불러오기
    fetchData();

    // 주기적으로 데이터 업데이트
    const intervalId = setInterval(() => {
      fetchData();
    }, 1000); // 5초마다 업데이트, 필요에 따라 조절 가능

    // 컴포넌트가 언마운트될 때 clearInterval로 인터벌 정리
    return () => clearInterval(intervalId);
  }, []); // 빈 배열을 전달하여 최초 한 번만 실행되도록 함

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
              <Link key={chat.id} href={`/selectDormitory/${chat.name}`}>
                <styled.MyChatting
                  $isCurrentChat={chat.name === currentDormitory}
                >
                  <styled.ChattingInfo>
                    <div style={{ display: 'flex' }}>
                      <styled.ChatName
                        $isCurrentChat={chat.name === currentDormitory}
                      >
                        {chat.name}
                      </styled.ChatName>
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
