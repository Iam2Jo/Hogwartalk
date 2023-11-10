'use client';

import React, { useEffect, useState } from 'react';
import * as styled from './selectDormitory.styles';
import { readChatting } from '@hooks/readChatting';
import { participateChatting } from '@hooks/participateChatting';
import Link from 'next/link';
import axios from 'axios';
import {
  gryffindorChatIdState,
  hufflepuffChatIdState,
  ravenclawChatIdState,
  slytherinChatIdState,
} from '@recoil/dormChatId';
import { useRecoilState } from 'recoil';

interface RequestBody {
  name: string;
  users: string[];
  isPrivate?: boolean;
}

type ResponseValue = any;
// type ResponseValue = Chat[]

interface Chat {
  id: string;
  name: string;
  users: User[]; // 속한 유저 정보
  isPrivate: boolean;
  latestMessage: Message | null;
  updatedAt: Date;
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

const SelectDormitory = () => {
  const data: ResponseValue | null = readChatting();
  const [chatData, setChatData] = useState<ResponseValue | null>();
  const [hasGryffindor, setHasGryffindor] = useState(true);
  const [hasSlytherin, setHasSlytherin] = useState(true);
  const [hasHufflepuff, setHasHufflepuff] = useState(true);
  const [hasRavenclaw, setHasRavenclaw] = useState(true);

  const [gryffindorChatId, setGryffindorChatId] = useRecoilState(
    gryffindorChatIdState,
  );
  const [hufflepuffChatId, setHufflepuffChatId] = useRecoilState(
    hufflepuffChatIdState,
  );
  const [ravenclawChatId, setRavenclawChatId] =
    useRecoilState(ravenclawChatIdState);
  const [slytherinChatId, setSlytherinChatId] =
    useRecoilState(slytherinChatIdState);

  const SERVER_KEY = '660d616b';
  const ACCESS_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGQ2MTZiOmhhcnJ5cG90dGVyIiwiaWF0IjoxNjk5MzQ1NDkzLCJleHAiOjE2OTk5NTAyOTN9.b5s4_9f-pVBj9ki17SXc6VvoiApMJZCJXfk5G2wskyo';
  const CREATE_CHAT_URL = 'https://fastcampus-chat.net/chat';
  const FIND_ALL_USER_URL = 'https://fastcampus-chat.net/users';
  const FIND_MY_CHAT_URL = 'https://fastcampus-chat.net/chat';

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    serverId: SERVER_KEY,
  };

  const gryffindorRequestData: RequestBody = {
    name: 'gryffindor',
    users: ['ron'],
  };

  const hufflepuffRequestData: RequestBody = {
    name: 'hufflepuff',
    users: ['ron'],
  };

  const ravenclawRequestData: RequestBody = {
    name: 'ravenclaw',
    users: ['ron'],
  };

  const slytherinRequestData: RequestBody = {
    name: 'slytherin',
    users: ['ron'],
  };

  const handleParticipate = (chatId: string) => {
    participateChatting(chatId);
  };

  useEffect(() => {
    setChatData(data);
  }, [data]);

  useEffect(() => {
    if (chatData) {
      console.log('chatData.chats', chatData.chats);
    }
  }, [chatData]);

  useEffect(() => {
    axios
      .get(FIND_ALL_USER_URL, { headers })
      .then((response) => {
        console.log('모든 유저 조회 성공!', response.data);
      })
      .catch((error) => {
        console.error('모든 유저 조회 실패!', error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(FIND_MY_CHAT_URL, { headers })
      .then((response) => {
        console.log('나의 채팅방 조회 성공!', response.data);
      })
      .catch((error) => {
        console.error('나의 채팅방 조회 실패!', error);
      });
  }, []);

  useEffect(() => {
    if (chatData) {
      let isThere = false;
      for (let i = 0; i < chatData.chats.length; i++) {
        if (chatData.chats[i].name === 'gryffindor') {
          isThere = true;
          console.log('gryffindor 기숙사가 이미 있습니다!');
          break;
        }
      }
      setHasGryffindor(true);

      if (!isThere) {
        console.log('gryffindor 기숙사가 없습니다!');
        setHasGryffindor(false);
      }
    }
  }, [chatData]);

  useEffect(() => {
    if (chatData) {
      let isThere = false;
      for (let i = 0; i < chatData.chats.length; i++) {
        if (chatData.chats[i].name === 'slytherin') {
          isThere = true;
          console.log('slytherin 기숙사가 이미 있습니다!');
          break;
        }
      }
      setHasSlytherin(true);

      if (!isThere) {
        console.log('slytherin 기숙사가 없습니다!');
        setHasSlytherin(false);
      }
    }
  }, [chatData]);

  useEffect(() => {
    if (chatData) {
      let isThere = false;
      for (let i = 0; i < chatData.chats.length; i++) {
        if (chatData.chats[i].name === 'hufflepuff') {
          isThere = true;
          console.log('hufflepuff 기숙사가 이미 있습니다!');
          break;
        }
      }
      setHasHufflepuff(true);
      if (!isThere) {
        console.log('hufflepuff 기숙사가 없습니다!');
        setHasHufflepuff(false);
      }
    }
  }, [chatData]);

  useEffect(() => {
    if (chatData) {
      let isThere = false;
      for (let i = 0; i < chatData.chats.length; i++) {
        if (chatData.chats[i].name === 'ravenclaw') {
          isThere = true;
          console.log('ravenclaw 기숙사가 이미 있습니다!');
          break;
        }
      }
      setHasRavenclaw(true);

      if (!isThere) {
        console.log('ravenclaw 기숙사가 없습니다!');
        setHasRavenclaw(false);
      }
    }
  }, [chatData]);

  useEffect(() => {
    if (!hasGryffindor) {
      axios
        .post(CREATE_CHAT_URL, gryffindorRequestData, { headers })
        .then((response) => {
          console.log('Gryffindor 채팅방 생성 완료', response.data);
          setGryffindorChatId(response.data.id);
        })
        .catch((error) => {
          console.error('Error sending the request:', error);
        });
    } else {
      if (chatData) {
        console.log('chatData', chatData);
        for (let i = chatData.chats.length - 1; i >= 0; i--) {
          if (chatData.chats[i].name === 'gryffindor') {
            setGryffindorChatId(chatData.chats[i].id);
            break;
          }
        }
      }
    }
  }, [hasGryffindor, chatData]);

  useEffect(() => {
    if (!hasHufflepuff) {
      axios
        .post(CREATE_CHAT_URL, hufflepuffRequestData, { headers })
        .then((response) => {
          console.log('Hufflepuff 채팅방 생성 완료', response.data);
          setHufflepuffChatId(response.data.id);
        })
        .catch((error) => {
          console.error('Error sending the request:', error);
        });
    } else {
      if (chatData) {
        for (let i = chatData.chats.length - 1; i >= 0; i--) {
          if (chatData.chats[i].name === 'hufflepuff') {
            setHufflepuffChatId(chatData.chats[i].id);
            break;
          }
        }
      }
    }
  }, [hasHufflepuff, chatData]);

  useEffect(() => {
    if (!hasRavenclaw) {
      axios
        .post(CREATE_CHAT_URL, ravenclawRequestData, { headers })
        .then((response) => {
          console.log('Ravenclaw 채팅방 생성 완료', response.data);
          setRavenclawChatId(response.data.id);
        })
        .catch((error) => {
          console.error('Error sending the request:', error);
        });
    } else {
      if (chatData) {
        for (let i = chatData.chats.length - 1; i >= 0; i--) {
          if (chatData.chats[i].name === 'ravenclaw') {
            setRavenclawChatId(chatData.chats[i].id);
            break;
          }
        }
      }
    }
  }, [hasRavenclaw, chatData]);

  useEffect(() => {
    if (!hasSlytherin) {
      axios
        .post(CREATE_CHAT_URL, slytherinRequestData, { headers })
        .then((response) => {
          console.log('Slytherin 채팅방 생성 완료', response.data);
          setSlytherinChatId(response.data.id);
        })
        .catch((error) => {
          console.error('Error sending the request:', error);
        });
    } else {
      if (chatData) {
        for (let i = chatData.chats.length - 1; i >= 0; i--) {
          if (chatData.chats[i].name === 'slytherin') {
            setSlytherinChatId(chatData.chats[i].id);
            break;
          }
        }
      }
    }
  }, [hasSlytherin, chatData]);

  useEffect(() => {
    console.log('gryffindorChatId', gryffindorChatId);
  }, [gryffindorChatId]);

  return (
    <styled.Wrapper>
      <styled.LeftSection>
        <Link
          href="/selectDormitory/gryffindor"
          style={{ width: '100%', height: '100%' }}
        >
          <styled.GryffindorSVG
            onClick={() => handleParticipate(gryffindorChatId)}
          />
        </Link>
        <Link
          href="/selectDormitory/ravenclaw"
          style={{ width: '100%', height: '100%' }}
        >
          <styled.RavenclawSVG
            onClick={() => handleParticipate(ravenclawChatId)}
          />
        </Link>
      </styled.LeftSection>
      <styled.CenterSection>
        <styled.ClubSVG />
      </styled.CenterSection>
      <styled.RightSection>
        <Link
          href="/selectDormitory/hufflepuff"
          style={{ width: '100%', height: '100%' }}
        >
          <styled.HufflepuffSVG
            onClick={() => handleParticipate(hufflepuffChatId)}
          />
        </Link>
        <Link
          href="/selectDormitory/slytherin"
          style={{ width: '100%', height: '100%' }}
        >
          <styled.SlytherinSVG
            onClick={() => handleParticipate(slytherinChatId)}
          />
        </Link>
      </styled.RightSection>
    </styled.Wrapper>
  );
};

export default SelectDormitory;
