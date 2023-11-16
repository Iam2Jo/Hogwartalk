'use client';
import { atom } from 'recoil';

export const chatListState = atom({
  key: 'chatListState',
  default: [{ id: '', name: '', users: [], isPrivate: false, updatedAt: null }],
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

export const chatInfoState = atom({
  key: 'chatInfoState',
  default: {
    name: '',
    id: '',
  },
});

export const createModalState = atom({
  key: 'createModalState',
  default: false,
});
