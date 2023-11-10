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
