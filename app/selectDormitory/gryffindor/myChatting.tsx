'use client';

import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import * as styled from './myChatting.styles';
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
    }, 5000); // 5초마다 업데이트, 필요에 따라 조절 가능

    // 컴포넌트가 언마운트될 때 clearInterval로 인터벌 정리
    return () => clearInterval(intervalId);
  }, []); // 빈 배열을 전달하여 최초 한 번만 실행되도록 함

  return (
    <styled.MyChattingContainer>
      <div>
        <span>참여중인 대화방</span>
        <span>{data?.chats?.length}</span>
      </div>
      <div>
        {data?.chats?.map((chat) => {
          const messageDate = new Date(chat.updatedAt);
          const timeString = messageDate.toLocaleString('en-US', {
            timeZone: 'Asia/Seoul',
            hour12: false,
            hour: 'numeric',
            minute: 'numeric',
          });
          return (
            // <div style={{ border: '1px solid black' }} key={chat.id}>
            <Link key={chat.name} href={`/selectDormitory/${chat.name}`}>
              <div style={{ border: '1px solid black', cursor: 'pointer' }}>
                <div style={{ gap: '1rem' }}>
                  <span>{chat.name}</span>
                  <span>{chat.users.length}</span>
                  <span>{timeString}</span>
                </div>
                <div style={{ gap: '1rem' }}>
                  {chat.latestMessage ? (
                    <>
                      <span>{chat.latestMessage.userId}</span>
                      <span>{chat.latestMessage.text}</span>
                    </>
                  ) : (
                    <>
                      <span>ㅤ</span>
                    </>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </styled.MyChattingContainer>
  );
};

export default MyChatting;
