'use client';

import type { NextPage } from 'next'
import * as styled from './selectDormitory.styles'
import cSocket from '@hooks/createChatting';
import rSocket from '@hooks/readChatting';
import { useEffect } from 'react';
import Link from 'next/link';

const SelectDormitory: NextPage = () => {

//   useEffect(()=>{
//     cSocket.connect();

//     return () => {
//       cSocket.disconnect();
//     };
//   },[])

  useEffect(()=>{
    console.log('a')
    rSocket.connect();
    console.log('b')

    return () => {
        rSocket.disconnect();
    };
  },[])

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
  )
  }
export default SelectDormitory;
