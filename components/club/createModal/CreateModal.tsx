import React, { useState, useEffect } from 'react';
import * as styled from './CreateModal.styles';
import CancelIcon from '@assets/icon/CancelIcon.svg';
import { createModalState } from '@recoil/chatList';
import { useSetRecoilState } from 'recoil';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { getToken } from '@utils/service';
import { addFirebaseData } from '@hooks/useFireFetch';

const createModal = () => {
  const SERVER_KEY = process.env.NEXT_PUBLIC_SERVER_KEY;
  const [accessToken, setAccessToken] = useState('');
  const headers = {
    'Content-Type': 'application/json',
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    serverId: SERVER_KEY,
  };

  const router = useRouter();
  const setCreateModalOpen = useSetRecoilState(createModalState);
  const [chatName, setChatName] = useState('');
  const onChangeChatName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatName(e.target.value);
  };
  const [isPrivate, setIsPrivate] = useState(false);
  const [myName, setMyName] = useState('');
  const GET_MY_INFO_URL = process.env.NEXT_PUBLIC_GET_MY_INFO_URL;

  const handleCreateChat = async (
    name: string,
    users: string[],
    myName: string,
    isPrivate?: boolean,
  ) => {
    const CREATE_CHAT_URL = process.env.NEXT_PUBLIC_CREATE_CHAT_URL;
    const requestData: any = {
      name: name,
      users: users,
      myName: myName,
      isPrivate: isPrivate,
    };
    try {
      const response = await axios.post(CREATE_CHAT_URL, requestData, {
        headers,
      });

      const newDormChatInfo = {
        id: response.data.id,
        name: response.data.name,
        users: response.data.users,
        isPrivate: response.data.isPrivate,
        updatedAt: response.data.updatedAt,
        host: myName,
      };
      router.push(
        '/club/' + newDormChatInfo.id + '&name=' + newDormChatInfo.name,
      );

      await addFirebaseData('chatInfo', name, newDormChatInfo);
      console.log(`${name} 채팅방 생성 완료`, response.data);

      setCreateModalOpen(false);
      document.body.style.overflowY = 'auto';
    } catch (error) {
      console.error('방 생성 실패!', error);
    }
  };

  const setCreateChat = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!myName) {
      return alert('내 정보를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
    }

    if (!chatName) {
      return alert('채팅방 제목을 입력하세요.');
    }
    handleCreateChat(chatName, [], myName, isPrivate);
  };

  useEffect(() => {
    const token = getToken();
    setAccessToken(token);
  }, []);

  useEffect(() => {
    axios.get(GET_MY_INFO_URL, { headers }).then((res) => {
      setMyName(res.data.user.name);
    });
  }, []);

  return (
    <>
      <styled.Container>
        <styled.Header>
          <styled.Title>채팅방 만들기</styled.Title>
          <styled.CancelIcon>
            <CancelIcon
              onClick={() => {
                setCreateModalOpen(false);
                document.body.style.overflowY = 'auto';
              }}
            />
          </styled.CancelIcon>
        </styled.Header>
        <styled.Content>
          <styled.SetWrap>
            <styled.SetTitle>채팅방 제목</styled.SetTitle>
            <styled.SetTitleInput onChange={onChangeChatName} />
          </styled.SetWrap>
          <styled.SetWrap>
            <styled.SetTitle>채팅방 공개</styled.SetTitle>
            <styled.InputWrap>
              <label>
                <styled.SetPrivateInput
                  type="radio"
                  name="private"
                  defaultChecked
                  onChange={() => {
                    setIsPrivate(false);
                  }}
                />
                공개
              </label>
              <label>
                <styled.SetPrivateInput
                  type="radio"
                  name="private"
                  onChange={() => {
                    setIsPrivate(true);
                  }}
                />
                비공개
              </label>
            </styled.InputWrap>
          </styled.SetWrap>
          <styled.AddBtn onClick={setCreateChat}>채팅방 만들기</styled.AddBtn>
        </styled.Content>
      </styled.Container>
      <styled.Background />
    </>
  );
};

export default createModal;
