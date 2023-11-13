'use client';

import React, { useEffect, useState } from 'react';
import * as styled from './selectDormitory.styles';
import { readChatting } from '@hooks/readChatting';
import Link from 'next/link';
import axios from 'axios';
import {
  gryffindorChatInfoState,
  hufflepuffChatInfoState,
  ravenclawChatInfoState,
  slytherinChatInfoState,
} from '@recoil/dormChatInfo';

import { useSetRecoilState, useRecoilState } from 'recoil';
import { doesDormitoryExist } from '@hooks/doesDormitoryExist';
import createDormitoryIfNone from '@hooks/createDormitoryIfNone';
import { RequestBody as RequestBodyCreate } from '@/@types/RESTAPI/createChatting.types';
import { RequestBody as RequestBodyParticipate } from '@/@types/RESTAPI/participateChatting.types';

interface RequestBody {
  name: string;
  users: string[];
  isPrivate?: boolean;
}

interface DormChatInfo {
  name: string | null;
  users: string[];
  isPrivate: boolean | null;
  updatedAt: string | null;
  host: string | null;
}

type ResponseValue = any;
// type ResponseValue = Chat[]

const SelectDormitory = () => {
  const data: ResponseValue | null = readChatting();
  const [chatData, setChatData] = useState<ResponseValue | null>();
  const [myName, setMyName] = useState('');
  const [hasGryffindor, setHasGryffindor] = useState(true);
  const [hasSlytherin, setHasSlytherin] = useState(true);
  const [hasHufflepuff, setHasHufflepuff] = useState(true);
  const [hasRavenclaw, setHasRavenclaw] = useState(true);

  const [gryffindorChatInfo, setGryffindorChatInfo] = useRecoilState(
    gryffindorChatInfoState,
  );
  const [hufflepuffChatInfo, setHufflepuffChatInfo] = useRecoilState(
    hufflepuffChatInfoState,
  );
  const [ravenclawChatInfo, setRavenclawChatInfo] = useRecoilState(
    ravenclawChatInfoState,
  );

  const [slytherinChatInfo, setSlytherinChatInfo] = useRecoilState(
    slytherinChatInfoState,
  );

  const SERVER_KEY = '660d616b';
  // 현재 헤르미온느 ACCESS_TOKEN임!
  const ACCESS_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGQ2MTZiOmhlcm1pb25lIiwiaWF0IjoxNjk5NDIzOTI4LCJleHAiOjE3MDAwMjg3Mjh9.9FA24mkoipWSd4KlpxTX0L8mKmJj7LAVd_XEcW1Xt7w';
  const CREATE_CHAT_URL = 'https://fastcampus-chat.net/chat';
  const FIND_ALL_USER_URL = 'https://fastcampus-chat.net/users';
  const FIND_MY_CHAT_URL = 'https://fastcampus-chat.net/chat';
  const GET_MY_INFO_URL = 'https://fastcampus-chat.net/auth/me';

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    serverId: SERVER_KEY,
  };

  const gryffindorRequestData: RequestBodyCreate = {
    name: 'gryffindor',
    users: ['ron'],
  };

  const hufflepuffRequestData: RequestBodyCreate = {
    name: 'hufflepuff',
    users: ['ron'],
  };

  const ravenclawRequestData: RequestBodyCreate = {
    name: 'ravenclaw',
    users: ['ron'],
  };

  const slytherinRequestData: RequestBodyCreate = {
    name: 'slytherin',
    users: ['ron'],
  };

  const handleParticipate = (chatId: string) => {
    const PARTICIPATE_CHAT_URL = 'https://fastcampus-chat.net/chat/participate';
    const requestData: RequestBodyParticipate = {
      chatId: chatId,
    };
    axios
      .patch(PARTICIPATE_CHAT_URL, requestData, { headers })
      .then((response) => {
        console.log('채팅 참여 성공!', response.data);
      })
      .catch((error) => {
        console.error('채팅 참여 실패!', error);
      });
  };

  useEffect(() => {
    setChatData(data);
  }, [data]);

  useEffect(() => {
    axios.get(GET_MY_INFO_URL, { headers }).then((res) => {
      setMyName(res.data.user.name);
    });
  }, []);

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

  doesDormitoryExist('gryffindor', chatData, setHasGryffindor);
  doesDormitoryExist('slytherin', chatData, setHasSlytherin);
  doesDormitoryExist('hufflepuff', chatData, setHasHufflepuff);
  doesDormitoryExist('ravenclaw', chatData, setHasRavenclaw);

  useEffect(() => {
    console.log('gryffindorChatId', gryffindorChatInfo.id);
  }, [gryffindorChatInfo]);

  // 모듈화 필요
  useEffect(() => {
    axios.get(GET_MY_INFO_URL, { headers }).then((res) => {
      setMyName(res.data.user.name);
    });
  }, []);

  useEffect(() => {
    createDormitoryIfNone(
      hasGryffindor,
      chatData,
      CREATE_CHAT_URL,
      gryffindorRequestData,
      headers,
      myName,
      setGryffindorChatInfo,
    );
  }, [hasGryffindor, chatData]);

  useEffect(() => {
    createDormitoryIfNone(
      hasSlytherin,
      chatData,
      CREATE_CHAT_URL,
      slytherinRequestData,
      headers,
      myName,
      setSlytherinChatInfo,
    );
  }, [hasSlytherin, chatData]);

  useEffect(() => {
    createDormitoryIfNone(
      hasHufflepuff,
      chatData,
      CREATE_CHAT_URL,
      hufflepuffRequestData,
      headers,
      myName,
      setHufflepuffChatInfo,
    );
  }, [hasHufflepuff, chatData]);

  useEffect(() => {
    createDormitoryIfNone(
      hasRavenclaw,
      chatData,
      CREATE_CHAT_URL,
      ravenclawRequestData,
      headers,
      myName,
      setRavenclawChatInfo,
    );
  }, [hasRavenclaw, chatData]);

  // useEffect(() => {
  //   console.log('gryffindorChatId', gryffindorChatId);
  // }, [gryffindorChatId]);
  // useEffect(() => {
  //   console.log('ravenclawChatId', ravenclawChatId);
  // }, [ravenclawChatId]);
  // useEffect(() => {
  //   console.log('hufflepuffChatId', hufflepuffChatId);
  // }, [hufflepuffChatId]);
  // useEffect(() => {
  //   console.log('slytherinChatId', slytherinChatId);
  // }, [slytherinChatId]);

  // useEffect(() => {
  //   if (chatData) {
  //     console.log('chatData.chats', chatData.chats);
  //   }
  // }, [chatData]);

  return (
    <styled.Wrapper>
      <styled.LeftSection>
        <Link
          href="/selectDormitory/gryffindor"
          style={{ width: '100%', height: '100%' }}
        >
          <styled.GryffindorSVG
            onClick={() => handleParticipate(gryffindorChatInfo.id)}
          />
        </Link>
        <Link
          href="/selectDormitory/ravenclaw"
          style={{ width: '100%', height: '100%' }}
        >
          <styled.RavenclawSVG
            onClick={() => handleParticipate(ravenclawChatInfo.id)}
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
            onClick={() => handleParticipate(hufflepuffChatInfo.id)}
          />
        </Link>
        <Link
          href="/selectDormitory/slytherin"
          style={{ width: '100%', height: '100%' }}
        >
          <styled.SlytherinSVG
            onClick={() => handleParticipate(slytherinChatInfo.id)}
          />
        </Link>
      </styled.RightSection>
    </styled.Wrapper>
  );
};

export default SelectDormitory;
