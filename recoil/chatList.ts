'use client';
import { atom } from 'recoil';

export const chatListState = atom({
  key: 'chatListState',
  default: [{ id: '', name: '', users: [] }],
});

export const myChatListState = atom({
  key: 'myChatListState',
  default: [{ id: '', name: '', users: [] }],
});

export const isMyChatListState = atom({
  key: 'isMyChatListState',
  default: false,
});

export const joinModalState = atom({
  key: 'joinModalState',
  default: false,
});

export const chatTitleState = atom({
  key: 'chatTitleState',
  default: '',
});
