import type { NextPage } from 'next';
import SelectDormitory from './selectDormitory';
import { Header } from '@components/Header';

const a: NextPage = () => {
  return (
    <>
      <Header />
      <SelectDormitory />
    </>
  );
};

export default a;
