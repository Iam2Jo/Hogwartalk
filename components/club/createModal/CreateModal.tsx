import React, { useState, useEffect } from 'react';
import * as styled from './CreateModal.styles';
import CancelIcon from '@assets/icon/cancelIcon.svg';
import {
  createModalState,
  chatInfoState,
  joinModalState,
} from '@recoil/chatList';
import { useRecoilState, useSetRecoilState } from 'recoil';
import axios from 'axios';
import { RequestBody as RequestBodyCreateChatting } from '@hooks/RESTAPI/createChatting.type';
import { useRouter } from 'next/navigation';
import { getToken } from '@utils/service';

const createModal = () => {
  const SERVER_KEY = '660d616b';
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

  const handleCreateChat = (
    name: string,
    users: string[],
    isPrivate?: boolean,
  ) => {
    const CREATE_CHAT_URL = 'https://fastcampus-chat.net/chat';
    const requestData: RequestBodyCreateChatting = {
      name: name,
      users: users,
      isPrivate: isPrivate,
    };
    axios
      .post(CREATE_CHAT_URL, requestData, { headers })
      .then((response) => {
        console.log('방 생성 성공!', response.data);
        alert('채팅방 생성이 완료되었습니다.채팅방으로 이동합니다.');
        router.push('/club/' + response.data.id);
      })
      .catch((error) => {
        console.error('방 생성 실패!', error);
      });
  };

  const setCreateChat = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (onChangeChatName === null) {
      return alert('채팅방 제목을 입력하세요.');
    } else handleCreateChat(chatName, [], isPrivate);
  };

  useEffect(() => {
    const token = getToken();
    setAccessToken(token);
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
