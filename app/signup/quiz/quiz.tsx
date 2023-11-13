'use client';
import type { NextPage } from 'next';
import * as style from './quiz.styles';
import Content from '@components/quiz/content/Content';
import { useRecoilValue } from 'recoil';
import { modalState } from '@recoil/atom';
import Modal from '@components/quiz/modal/Modal';

const quiz: NextPage = () => {
  const modalOpen = useRecoilValue(modalState);
  return (
    <>
      {modalOpen && <Modal />}
      <style.Container>
        <Content />
      </style.Container>
    </>
  );
};

export default quiz;
