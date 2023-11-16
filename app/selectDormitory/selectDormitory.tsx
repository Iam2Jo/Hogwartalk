'use client';

import React, { useEffect, useState } from 'react';
import * as styled from './selectDormitory.styles';
import { readChatting } from '@hooks/RESTAPI/readChatting';
import Link from 'next/link';
import axios from 'axios';
import { doesDormitoryExist } from '@hooks/doesDormitoryExist';
import createDormitoryIfNone from '@hooks/createDormitoryIfNone';
import { RequestBody as RequestBodyCreate } from '@/@types/RESTAPI/createChatting.types';
import { RequestBody as RequestBodyParticipate } from '@/@types/RESTAPI/participateChatting.types';
import { getRefreshToken, getToken } from '@utils/service';
import {
  getFirebaseData,
  getFirebaseDatabyKeyVal,
  updateFirebaseData,
} from '@hooks/useFireFetch';
import { useRouter } from 'next/navigation';

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
  // const data: ResponseValue | null = readChatting();
  const [chatData, setChatData] = useState<ResponseValue | null>();
  const [myName, setMyName] = useState('');
  const [myId, setMyId] = useState('');
  const [myDorm, setMyDorm] = useState('');
  const [hasGryffindor, setHasGryffindor] = useState(true);
  const [hasSlytherin, setHasSlytherin] = useState(true);
  const [hasHufflepuff, setHasHufflepuff] = useState(true);
  const [hasRavenclaw, setHasRavenclaw] = useState(true);
  const [gryffindorFirebaseData, setGryffindorFirebaseData] =
    useState<any>(null);
  const [slytherinFirebaseData, setSlytherinFirebaseData] = useState<any>(null);
  const [hufflepuffFirebaseData, setHufflepuffFirebaseData] =
    useState<any>(null);
  const [ravenclawFirebaseData, setRavenclawFirebaseData] = useState<any>(null);
  const SERVER_KEY = process.env.NEXT_PUBLIC_SERVER_KEY;
  const [accessToken, setAccessToken] = useState('');
  const CREATE_CHAT_URL = process.env.NEXT_PUBLIC_CREATE_CHAT_URL;
  const FIND_ALL_USER_URL = process.env.NEXT_PUBLIC_FIND_ALL_USER_URL;
  const GET_MY_INFO_URL = process.env.NEXT_PUBLIC_GET_MY_INFO_URL;

  const headers = {
    'Content-Type': 'application/json',
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    serverId: SERVER_KEY,
  };

  const gryffindorRequestData: RequestBodyCreate = {
    name: 'gryffindor',
    users: [],
  };

  const hufflepuffRequestData: RequestBodyCreate = {
    name: 'hufflepuff',
    users: [],
  };

  const ravenclawRequestData: RequestBodyCreate = {
    name: 'ravenclaw',
    users: [],
  };

  const slytherinRequestData: RequestBodyCreate = {
    name: 'slytherin',
    users: [],
  };

  const handleParticipate = (
    dormitoryName: string,
    myDorm: string,
    firebaseData,
  ) => {
    if (dormitoryName !== myDorm) {
      alert('본인 기숙사가 아닌 기숙사는 참여할 수 없습니다!');
      return;
    }

    console.log('chatId: ', firebaseData[0].id);

    const PARTICIPATE_CHAT_URL = process.env.NEXT_PUBLIC_PARTICIPATE_CHAT_URL;
    const requestData: RequestBodyParticipate = {
      chatId: firebaseData[0].id,
    };
    axios
      .patch(PARTICIPATE_CHAT_URL, requestData, { headers })
      .then((response) => {
        console.log('채팅 참여 성공!', response.data);
        updateFirebaseData('chatInfo', firebaseData[0].name, response.data);
      })
      .catch((error) => {
        console.error('채팅 참여 실패!', error);
      });
  };

  // 로그인되어있지 않다면 로그인페이지 유도
  const router = useRouter();
  useEffect(() => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      alert('로그인이 필요합니다.');
      router.push('/');
    }
  }, []);

  useEffect(() => {
    const token = getToken();
    setAccessToken(token);
  }, []);

  useEffect(() => {
    axios.get(GET_MY_INFO_URL, { headers }).then((res) => {
      setMyId(res.data.user.id);
      setMyName(res.data.user.name);
    });
  }, []);

  useEffect(() => {
    getFirebaseDatabyKeyVal('users', 'id', myId).then((res) => {
      console.log('firebase userInfo:  ', res);
      const dormitoryName = res[0]?.class;

      switch (dormitoryName) {
        case '그리핀도르':
          setMyDorm('gryffindor');
          break;
        case '슬리데린':
          setMyDorm('slytherin');
          break;
        case '후플푸프':
          setMyDorm('hufflepuff');
          break;
        case '래번클로':
          setMyDorm('ravenclaw');
          break;
        default:
          break;
      }
    });
  }, [myId]);

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
    createDormitoryIfNone(
      hasGryffindor,
      CREATE_CHAT_URL,
      gryffindorRequestData,
      headers,
      'gryffindor',
      myName,
    ).then(async () => {
      const firebaseData = await getFirebaseDatabyKeyVal(
        'chatInfo',
        'name',
        'gryffindor',
      );

      setGryffindorFirebaseData(firebaseData);
    });
  }, [hasGryffindor, chatData]);

  useEffect(() => {
    createDormitoryIfNone(
      hasSlytherin,
      CREATE_CHAT_URL,
      slytherinRequestData,
      headers,
      'slytherin',
      myName,
    ).then(async () => {
      const firebaseData = await await getFirebaseDatabyKeyVal(
        'chatInfo',
        'name',
        'slytherin',
      );
      setSlytherinFirebaseData(firebaseData);
    });
  }, [hasSlytherin, chatData]);

  useEffect(() => {
    createDormitoryIfNone(
      hasHufflepuff,
      CREATE_CHAT_URL,
      hufflepuffRequestData,
      headers,
      'hufflepuff',
      myName,
    ).then(async () => {
      const firebaseData = await await getFirebaseDatabyKeyVal(
        'chatInfo',
        'name',
        'hufflepuff',
      );
      setHufflepuffFirebaseData(firebaseData);
    });
  }, [hasHufflepuff, chatData]);

  useEffect(() => {
    createDormitoryIfNone(
      hasRavenclaw,
      CREATE_CHAT_URL,
      ravenclawRequestData,
      headers,
      'ravenclaw',
      myName,
    ).then(async () => {
      const firebaseData = await await getFirebaseDatabyKeyVal(
        'chatInfo',
        'name',
        'ravenclaw',
      );
      setRavenclawFirebaseData(firebaseData);
    });
  }, [hasRavenclaw, chatData]);

  return (
    <styled.Container>
      <styled.Wrapper>
        <styled.LeftSection>
          <Link
            href="/selectDormitory/gryffindor"
            style={{ width: '100%', height: '100%' }}
            onClick={(e) => {
              if ('gryffindor' !== myDorm) {
                e.preventDefault();
              }
              handleParticipate('gryffindor', myDorm, gryffindorFirebaseData);
            }}
          >
            <styled.GryffindorSVG width="224" height="272" />
          </Link>
          <Link
            href="/selectDormitory/ravenclaw"
            style={{ width: '100%', height: '100%' }}
            onClick={(e) => {
              if ('ravenclaw' !== myDorm) {
                e.preventDefault();
              }
              handleParticipate('ravenclaw', myDorm, ravenclawFirebaseData);
            }}
          >
            <styled.RavenclawSVG width="224" height="272" />
          </Link>
        </styled.LeftSection>
        <styled.CenterSection>
          <Link href="/club">
            <styled.ClubSVG />
          </Link>
        </styled.CenterSection>
        <styled.RightSection>
          <Link
            href="/selectDormitory/hufflepuff"
            style={{ width: '100%', height: '100%' }}
            onClick={(e) => {
              if ('hufflepuff' !== myDorm) {
                e.preventDefault();
              }
              handleParticipate('hufflepuff', myDorm, hufflepuffFirebaseData);
            }}
          >
            <styled.HufflepuffSVG width="224" height="272" />
          </Link>
          <Link
            href="/selectDormitory/slytherin"
            style={{ width: '100%', height: '100%' }}
            onClick={(e) => {
              if ('slytherin' !== myDorm) {
                e.preventDefault();
              }
              handleParticipate('slytherin', myDorm, slytherinFirebaseData);
            }}
          >
            <styled.SlytherinSVG width="224" height="272" />
          </Link>
        </styled.RightSection>
      </styled.Wrapper>
    </styled.Container>
  );
};

export default SelectDormitory;
