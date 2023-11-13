'use client';
import { Header } from '@components/Header';
import React, { useEffect, useState } from 'react';
import * as styled from './club.styles';
import ChatItem from '@components/club/chatItem/chatItem';
import axios from 'axios';
import {
  createModalState,
  chatListState,
  joinModalState,
  myChatListState,
} from '@recoil/chatList';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import CandleImg from '@assets/img/Candles.svg';
import JoinModal from '@components/club/joinModal/page';
import CreateModal from '@components/club/createModal/page';
import Loading from '@components/club/loading/page';

const club = () => {
  const SERVER_KEY = '660d616b';

  //헤르미온느 토큰
  const ACCESS_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGQ2MTZiOmhlcm1pb25lIiwiaWF0IjoxNjk5NDIzOTI4LCJleHAiOjE3MDAwMjg3Mjh9.9FA24mkoipWSd4KlpxTX0L8mKmJj7LAVd_XEcW1Xt7w';

  const FIND_ALL_CHAT_URL = 'https://fastcampus-chat.net/chat/all';
  const FIND_MY_CHAT_URL = 'https://fastcampus-chat.net/chat';

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    serverId: SERVER_KEY,
  };

  const chatList = useRecoilValue(chatListState);
  const setChatList = useSetRecoilState(chatListState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getChatList = async () => {
      setLoading(true);
      const ChatList = await axios
        .get(FIND_ALL_CHAT_URL, { headers })
        .then((response) => {
          setLoading(false);
          setChatList(response.data.chats);
        })
        .catch((error) => {
          console.error('모든 채팅방 조회 실패!', error);
        });
    };
    getChatList();
  }, []);

  console.log(chatList[0]);

  const setMyChatList = useSetRecoilState(myChatListState);

  useEffect(() => {
    const getMyChatList = async () => {
      const MyChatList = await axios
        .get(FIND_MY_CHAT_URL, { headers })
        .then((response) => {
          console.log('나의 채팅방 조회 성공', response.data);
          setMyChatList(response.data.chats);
        })
        .catch((error) => {
          console.error('나의 채팅방 조회 실패!', error);
        });
    };
    getMyChatList();
  }, []);

  const joinModalOpen = useRecoilValue(joinModalState);

  const createModalOpen = useRecoilValue(createModalState);
  const setCreateModalOpen = useSetRecoilState(createModalState);

  const setCreateModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCreateModalOpen(true);
    document.body.style.overflowY = 'hidden';
  };

  return (
    <>
      {loading && <Loading />}
      {joinModalOpen && <JoinModal />}
      {createModalOpen && <CreateModal />}
      <Header />
      <CandleImg width="100%" />
      <styled.Container>
        <styled.HeaderWrap>
          <styled.Title>CLUB</styled.Title>
          <styled.AddChatBtn onClick={setCreateModal}>+</styled.AddChatBtn>
        </styled.HeaderWrap>
        <styled.ChatList>
          {' '}
          {chatList.map((chat) => (
            <ChatItem
              key={chat.id}
              id={chat.id}
              name={chat.name}
              users={chat.users}
            />
          ))}
        </styled.ChatList>
      </styled.Container>
    </>
  );
};

export default club;
