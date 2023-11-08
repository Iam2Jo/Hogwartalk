'use client';
import type { NextPage } from 'next';
import Hat from '../../assets/img/Hat.svg';
import Logo from '../../assets/img/Logo.svg';
import * as style from './page.styles';
import QuizForm from './components/form/QuizForm';

const quiz: NextPage = () => {
  return (
    <style.Container>
      <style.Logo>
        <Logo />
      </style.Logo>
      <style.Content>
        <style.HatImg>
          <Hat />
        </style.HatImg>
        <QuizForm />
      </style.Content>
    </style.Container>
  );
};

export default quiz;
