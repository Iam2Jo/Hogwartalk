'use client';
import React, { useEffect, useState } from 'react';
import * as styled from './chatItem.styles';
import {
  chatInfoState,
  chatListState,
  joinModalState,
  myChatListState,
} from '@recoil/chatList';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import UserIcon from '@assets/icon/UserIcon.svg';
import { useRouter } from 'next/navigation';

interface Chat {
  id: string;
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
  const router = useRouter();
  const chatList = useRecoilValue(chatListState);
  const myChatList = useRecoilValue(myChatListState);

  const [isMyChat, setIsMyChat] = useState(false);

  useEffect(() => {
    for (let i = 0; i < myChatList.length; i++) {
      if (id === myChatList[i].id) {
        setIsMyChat(true);
      }
    }
  }, [myChatList]);

  const setJoinModalOpen = useSetRecoilState(joinModalState);
  const setChatInfo = useSetRecoilState(chatInfoState);
  const chatInfo = useRecoilValue(chatInfoState);

  const handleJoin = () => {
    const chatDetail = {
      name,
      id,
    };
    setChatInfo(chatDetail);
    if (isMyChat) {
      const idParam = chatDetail.id;
      const nameParam = chatDetail.name;
      router.push('/club/' + idParam + '&name=' + nameParam);
      return;
    }
    setJoinModalOpen(true);
    document.body.style.overflowY = 'hidden';
  };

  return (
    <styled.Container onClick={handleJoin}>
      {chatList.length > 0 ? (
        <styled.Content>
          <styled.Title>
            {name.length < 30 ? name : name.slice(0, 29) + '...'}
          </styled.Title>
          <styled.BottomWrap>
            <styled.UserInfoWrap>
              <UserIcon />
              <styled.UserCount> {users.length}</styled.UserCount>
            </styled.UserInfoWrap>
            {isMyChat && <styled.Badge>참여중</styled.Badge>}
          </styled.BottomWrap>
        </styled.Content>
      ) : (
        <div>loading. ..</div>
      )}
    </styled.Container>
  );
};

export default chatItem;
