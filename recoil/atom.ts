import { atom } from 'recoil';

//atom({key:, default:})로 새로운 아톰을 만들 수 있다.
// 이때 key는 각 아톰을 구별하는 고유한 식별자이다.
// default는 initial state를 의미한다.
export const quizScoreState = atom({
  key: 'quizScoreState',
  default: 0,
});

export const currentIndexState = atom({
  key: 'currentIndexState',
  default: 0,
});
