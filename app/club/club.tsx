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
import { getToken } from '@utils/service';

const club = () => {
  const SERVER_KEY = '660d616b';
  const [accessToken, setAccessToken] = useState('');
  const FIND_ALL_CHAT_URL = process.env.REACT_APP_FIND_ALL_CHAT_URL;
  const FIND_MY_CHAT_URL = process.env.REACT_APP_FIND_MY_CHAT_URL;

  const headers = {
    'Content-Type': 'application/json',
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    serverId: SERVER_KEY,
  };

  const chatList = useRecoilValue(chatListState);
  const setChatList = useSetRecoilState(chatListState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    setAccessToken(token);
  }, []);

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
          {chatList
            .filter(
              (chat) =>
                chat.name !== 'hufflepuff' &&
                chat.name !== 'slytherin' &&
                chat.name !== 'gryffindor' &&
                chat.name !== 'ravenclaw',
            )
            .map((chat) => (
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
