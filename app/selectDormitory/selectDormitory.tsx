'use client'

import type { NextPage } from 'next'
import * as styled from './selectDormitory.styles'
import cSocket from '@hooks/createChatting';
import rSocket from '@hooks/readChatting';
import { useEffect } from 'react';

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
    <div>
        <h1>
          SelectDormitory Page
        </h1>
          <styled.GryffindorSVG/>
          <styled.SlytherinSVG/>
          <styled.HufflepuffSVG/>
          <styled.RavenclawSVG/>
          <styled.ClubSVG/>
    </div>
  );
};

export default SelectDormitory;