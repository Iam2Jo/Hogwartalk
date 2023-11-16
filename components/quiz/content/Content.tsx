'use client';
import Hat from '@assets/img/Hat.svg';
import Logo from '@assets/img/Logo.svg';
import * as style from './Content.styles';
import QuizForm from '../form/QuizForm';
import Link from 'next/link';

const Content = () => {
  return (
    <>
      <style.Logo>
        <Link href="/">
          <Logo />
        </Link>
      </style.Logo>
      <style.Content>
        <style.HatImg>
          <Hat />
        </style.HatImg>
        <QuizForm />
      </style.Content>
    </>
  );
};

export default Content;
