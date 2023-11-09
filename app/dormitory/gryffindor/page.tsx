'use client';

import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import { gryffindorChatIdState } from '@recoil/dormChatId';
import { useRecoilValue } from 'recoil';
import axios from 'axios';

interface RequestBody {
  chatId: string;
}
'use client';

import React, { useEffect, useState } from 'react';
import { createChatting } from '@hooks/createChatting';
import { readChatting } from '@hooks/readChatting';

type ResponseValue = any
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

const Gryffindor = () => {
  return <div>그리핀도르</div>;
};

export default Gryffindor;
