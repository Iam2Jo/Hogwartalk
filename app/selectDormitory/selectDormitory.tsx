'use client';

import React, { useEffect, useState } from 'react';
import * as styled from './selectDormitory.styles';
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

const SelectDormitory = () => {
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

  useEffect(() => {
    axios
      .post(CREATE_CHAT_URL, gryffindorRequestData, { headers })
      .then((response) => {
        console.log('Gryffindor 채팅방 생성 완료', response.data);
        setGryffindorChatId(response.data.id);
      })
      .catch((error) => {
        console.error('Error sending the request:', error);
      });

    axios
      .post(CREATE_CHAT_URL, hufflepuffRequestData, { headers })
      .then((response) => {
        console.log('Hufflepuff 채팅방 생성 완료', response.data);
        setHufflepuffChatId(response.data.id);
      })
      .catch((error) => {
        console.error('Error sending the request:', error);
      });

    axios
      .post(CREATE_CHAT_URL, ravenclawRequestData, { headers })
      .then((response) => {
        console.log('Ravenclaw 채팅방 생성 완료', response.data);
        setRavenclawChatId(response.data.id);
      })
      .catch((error) => {
        console.error('Error sending the request:', error);
      });

    axios
      .post(CREATE_CHAT_URL, slytherinRequestData, { headers })
      .then((response) => {
        console.log('Slytherin 채팅방 생성 완료', response.data);
        setSlytherinChatId(response.data.id);
      })
      .catch((error) => {
        console.error('Error sending the request:', error);
      });
  }, []);

  return (
    <styled.Wrapper>
      <styled.LeftSection>
        <Link
          href="/dormitory/gryffindor"
          style={{ width: '100%', height: '100%' }}
        >
          <styled.GryffindorSVG />
        </Link>
        <Link
          href="/dormitory/ravenclaw"
          style={{ width: '100%', height: '100%' }}
        >
          <styled.RavenclawSVG />
        </Link>
      </styled.LeftSection>
      <styled.CenterSection>
        <styled.ClubSVG />
      </styled.CenterSection>
      <styled.RightSection>
        <Link
          href="/dormitory/hufflepuff"
          style={{ width: '100%', height: '100%' }}
        >
          <styled.HufflepuffSVG />
        </Link>
        <Link
          href="/dormitory/slytherin"
          style={{ width: '100%', height: '100%' }}
        >
          <styled.SlytherinSVG />
        </Link>
      </styled.RightSection>
    </styled.Wrapper>
  );
};

export default SelectDormitory;
