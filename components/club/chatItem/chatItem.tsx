'use client';
import React, { useEffect, useState } from 'react';
import * as styled from './chatItem.styles';
import {
  chatListState,
  chatTitleState,
  joinModalState,
  myChatListState,
} from '@recoil/chatList';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

interface Chat {
  name: string;
  users: User[]; // 속한 유저 정보
}

interface User {
  id: string;
  name: string;
  picture: string;
}

interface Message {
  id: string;
  text: string;
  userId: string;
  createAt: Date;
}

const chatItem = ({ id, name, users }: Chat) => {
  const chatList = useRecoilValue(chatListState);
  const myChatList = useRecoilValue(myChatListState);

  const [isMyChat, setIsMyChat] = useState(false);

  useEffect(() => {
    for (let i = 0; i < myChatList.length; i++) {
      if (name === myChatList[i].name) {
        setIsMyChat(true);
      }
    }
  }, [myChatList]);

  const setJoinModalOpen = useSetRecoilState(joinModalState);
  const setChatTitle = useSetRecoilState(chatTitleState);

  const handleJoin = () => {
    for (let i = 0; i < myChatList.length; i++) {
      if (name === myChatList[i].name) {
        setJoinModalOpen(true);
        setChatTitle(name);
      }
    }
  };

  return (
    <styled.Container onClick={handleJoin}>
      {chatList.length > 0 ? (
        <styled.Content>
          <styled.Title>{name}</styled.Title>
          <styled.BottomWrap>
            {isMyChat && <styled.Badge>참여중</styled.Badge>}
            <styled.UserInfoWrap>
              <styled.UserCount>{users.length}</styled.UserCount>
              <span>/</span>
              <styled.UserMaximum>N</styled.UserMaximum>
            </styled.UserInfoWrap>
          </styled.BottomWrap>
        </styled.Content>
      ) : (
        <div>loading. ..</div>
      )}
    </styled.Container>
  );
};

export default chatItem;
