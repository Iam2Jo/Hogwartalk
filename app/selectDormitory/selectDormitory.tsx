'use client';

import React, { useEffect, useState } from 'react';
import * as styled from './selectDormitory.styles';
import { readChatting } from '@hooks/RESTAPI/readChatting';
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
import { getToken } from '@utils/service';

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
  const [accessToken, setAccessToken] = useState('');
  const CREATE_CHAT_URL = 'https://fastcampus-chat.net/chat';
  const FIND_ALL_USER_URL = 'https://fastcampus-chat.net/users';
  const FIND_MY_CHAT_URL = 'https://fastcampus-chat.net/chat';
  const GET_MY_INFO_URL = 'https://fastcampus-chat.net/auth/me';

  const headers = {
    'Content-Type': 'application/json',
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
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
    const token = getToken();
    setAccessToken(token);
  }, []);

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
            width="224"
            height="272"
          />
        </Link>
        <Link
          href="/selectDormitory/ravenclaw"
          style={{ width: '100%', height: '100%' }}
        >
          <styled.RavenclawSVG
            onClick={() => handleParticipate(ravenclawChatInfo.id)}
            width="224"
            height="272"
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
            width="224"
            height="272"
          />
        </Link>
        <Link
          href="/selectDormitory/slytherin"
          style={{ width: '100%', height: '100%' }}
        >
          <styled.SlytherinSVG
            onClick={() => handleParticipate(slytherinChatInfo.id)}
            width="224"
            height="272"
          />
        </Link>
      </styled.RightSection>
    </styled.Wrapper>
  );
};

export default SelectDormitory;
