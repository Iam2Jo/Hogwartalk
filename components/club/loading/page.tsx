import React from 'react';
import Loading from '@assets/img/Loading.gif';
import Image from 'next/image';
import * as styled from './page.styles';

const page = () => {
  return (
    <styled.Background>
      <styled.LoadingWrap>
        <styled.Loading>
          <Image src={Loading} alt="로딩중" />
        </styled.Loading>
        <styled.Title>불러오는 중 ...</styled.Title>
      </styled.LoadingWrap>
    </styled.Background>
  );
};

export default page;
