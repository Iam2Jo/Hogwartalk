'use client';
import { atom } from 'recoil';

//점수 합산 기준 기숙사 배정 값
export const teamState = atom({
  key: 'teamState',
  default: '',
});

export const modalState = atom({
  key: 'modalState',
  default: false,
});

export const signupState = atom({
  key: 'signupState',
  default: {
    id: '',
    password: '',
    name: '',
    picture:
      'https://firebasestorage.googleapis.com/v0/b/howgwatalk.appspot.com/o/usersimage%2Fdefault.png?alt=media&token=c2a89996-1fae-4bfc-8776-ee0e639941a8',
  },
});

export const userImageState = atom({
  key: 'userImageState',
  default: undefined,
});

export const userPreviewState = atom({
  key: 'userPreviewState',
  default:
    'https://firebasestorage.googleapis.com/v0/b/howgwatalk.appspot.com/o/usersimage%2Fdefault.png?alt=media&token=c2a89996-1fae-4bfc-8776-ee0e639941a8',
});
