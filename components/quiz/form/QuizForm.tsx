import React, { use, useEffect, useState } from 'react';
import QuizData from '@/app/signup/quiz/db/QuizData';
import * as style from './QuizForm.style';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { modalState, teamState } from '@recoil/atom';

const QuizForm = () => {
  //진행중인 문항 번호
  const [currentIndex, setCurrentIndex] = useState(0);
  //점수 합산
  const [totalScore, setTotalScore] = useState(0);
  //문항별 점수
  const [score, setScore] = useState(0);
  //1,2,3번 문항에서 선택한 답변 번호 (디폴트는 0, 1번 답변 선택시 1, 2번 답변 선택시 2 부여)
  const [firstSelect, setFirstSelect] = useState(0);
  const [secondSelect, setSecondSelect] = useState(0);
  const [thirdSelect, setThirdSelect] = useState(0);
  //첫번째 답변인풋 선택 여부
  const [firstAnswer, setFirstAnswer] = useState(false);
  //두번째 답변인풋 선택 여부
  const [secondAnswer, setSecondAnswer] = useState(false);
  //점수 합산 기준 기숙사 배정 값
  const team = useRecoilValue(teamState);
  const setTeam = useSetRecoilState(teamState);
  //결과창 모달
  const modalOpen = useRecoilValue(modalState);
  const setModalOpen = useSetRecoilState(modalState);

  const setPrevQuiz = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCurrentIndex(currentIndex - 1);
    if (currentIndex - 1 === 0) {
      if (firstSelect === 1) {
        setFirstAnswer(true);
        setSecondAnswer(false);
      } else {
        setFirstAnswer(false);
        setSecondAnswer(true);
      }
    } else if (currentIndex - 1 === 1) {
      if (secondSelect === 1) {
        setFirstAnswer(true);
        setSecondAnswer(false);
      } else {
        setFirstAnswer(false);
        setSecondAnswer(true);
      }
    }
  };

  const setNextQuiz = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (firstAnswer === false && secondAnswer === false) {
      return alert('답을 선택해주세요.');
    } else setCurrentIndex(currentIndex + 1);

    if (currentIndex + 1 === 1) {
      if (secondSelect === 0) {
        setFirstAnswer(false);
        setSecondAnswer(false);
      } else if (secondSelect === 1) {
        setFirstAnswer(true);
        setSecondAnswer(false);
      } else {
        setFirstAnswer(false);
        setSecondAnswer(true);
      }
    } else if (currentIndex + 1 === 2) {
      if (thirdSelect === 0) {
        setFirstAnswer(false);
        setSecondAnswer(false);
      } else if (thirdSelect === 1) {
        setFirstAnswer(true);
        setSecondAnswer(false);
      } else {
        setFirstAnswer(false);
        setSecondAnswer(true);
      }
    }

    setTotalScore(totalScore + score);
  };
  const setResult = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (totalScore === 3) {
      setTeam('슬리데린');
    } else if (totalScore === 4) {
      setTeam('래번클로');
    } else if (totalScore === 5) {
      setTeam('그리핀도르');
    } else setTeam('후플푸프');
    setModalOpen(true);
  };

  const AddFirstScore = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstAnswer(true);
    setSecondAnswer(false);

    if (currentIndex === 0) {
      setFirstSelect(1);
    } else if (currentIndex === 1) {
      setSecondSelect(1);
    } else setThirdSelect(1);

    setScore(QuizData[currentIndex].answer1.score);
  };
  const AddSecondScore = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstAnswer(false);
    setSecondAnswer(true);
    if (currentIndex === 0) {
      setFirstSelect(2);
    } else if (currentIndex === 1) {
      setSecondSelect(2);
    } else setThirdSelect(2);

    setScore(QuizData[currentIndex].answer2.score);
  };

  useEffect(() => {
    console.log(team);
  }, [team]);

  return (
    <style.Container onSubmit={setResult}>
      <style.Title>{QuizData[currentIndex].title}</style.Title>
      <style.InputWrap>
        <style.AnswerInput
          id="answer1"
          type="radio"
          name="Answer"
          onChange={AddFirstScore}
          checked={firstAnswer}
        />
        <style.AnswerLabel htmlFor="answer1">
          {QuizData[currentIndex].answer1.content}
        </style.AnswerLabel>
        <style.AnswerInput
          id="answer2"
          type="radio"
          name="Answer"
          onChange={AddSecondScore}
          checked={secondAnswer}
        />
        <style.AnswerLabel htmlFor="answer2">
          {QuizData[currentIndex].answer2.content}
        </style.AnswerLabel>
        {}
        <style.BtnWrap>
          {currentIndex === 0 ? (
            <style.SubmitBtn onClick={setNextQuiz}>다음</style.SubmitBtn>
          ) : (
            <>
              {currentIndex === 2 ? (
                <style.SubmitBtn type="submit">제출하기</style.SubmitBtn>
              ) : (
                <style.SubmitBtn onClick={setNextQuiz}>다음</style.SubmitBtn>
              )}
              <style.SubmitBtn onClick={setPrevQuiz}>이전</style.SubmitBtn>
            </>
          )}
        </style.BtnWrap>
      </style.InputWrap>
    </style.Container>
  );
};

export default QuizForm;
