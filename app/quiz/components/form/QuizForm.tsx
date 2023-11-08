import React from 'react';
import QuizData from '../../db/QuizData';
import * as style from './QuizForm.style';

const QuizForm = () => {
  return (
    <style.Container>
      <style.Title>
        {' '}
        Q1. 스네이프 교수님의 수업이 시작되기 10분 전, 교실 밖에서 아주 서럽게
        울고있는 친구를 발견한 나는?{' '}
      </style.Title>
      <style.InputWrap>
        <style.AnswerInput id="answer1" type="radio" name="Answer" />
        <style.AnswerLabel htmlFor="answer1">
          이 교수님한테 찍히면 나만 손해. 못본척 하고 교실 뒷문으로 들어간다.
        </style.AnswerLabel>
        <style.AnswerInput id="answer2" type="radio" name="Answer" />
        <style.AnswerLabel htmlFor="answer2">
          너무 슬프게 우는데.. 일단 친구를 달래주러 간다.{' '}
        </style.AnswerLabel>
        <style.BtnWrap>
          <style.SubmitBtn>이전</style.SubmitBtn>
          <style.SubmitBtn>다음</style.SubmitBtn>
        </style.BtnWrap>
      </style.InputWrap>
    </style.Container>
  );
};

export default QuizForm;
