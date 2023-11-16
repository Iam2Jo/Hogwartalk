'use client';
import type { NextPage } from 'next';
import { Fragment, useState } from 'react';
import cookies from 'react-cookies';
import { LoginContainer, LoginFormStyle } from './loginStyle';
import { useRouter } from 'next/navigation';
import {
  reissueAccessToken,
  getToken,
  getUserdata,
  loginUser,
} from '../utils/service';
import { audioState } from '@recoil/atom';
import { useRecoilState, useSetRecoilState } from 'recoil';

type LoginData = {
  id: string;
  password: string;
};
const main: NextPage = () => {
  const setPlay = useSetRecoilState(audioState);

  const router = useRouter();
  const [loginData, setLoginData] = useState<LoginData>({
    id: '',
    password: '',
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLoginData({ ...loginData, [id]: value });
  };
  const handleAudio = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPlay(true);
  };
  const handleButtonClick = async () => {
    try {
      const token = await loginUser(loginData);
      if (token === undefined){
        alert('아이디와 비밀번호가 올바른지 확인해주세요');
        return;
      }
      cookies.save('accessToken', token?.accessToken, {
        maxAge: 3600 * 24 * 7,
      });
      cookies.save('refreshToken', token?.refreshToken);
      const userData = await getUserdata();
      console.log(userData);

    } catch (error) {
      console.log(error)
      alert('아이디와 비밀번호가 올바른지 확인해주세요');
      return;
    }
    router.push('/selectDormitory');
  };

  return (
    <LoginContainer>
      <header>
        <img src="/LoginTitle.png" alt="logintitle" />
      </header>
      <main>
        <LoginFormStyle>
          <form>
            <div className="form__input">
              <label htmlFor="id">아이디</label>
              <input
                type="text"
                name=""
                id="id"
                value={loginData.id}
                onChange={handleInputChange}
                onClick={handleAudio}
              />
            </div>
            <div className="form__input">
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                name=""
                id="password"
                value={loginData.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="footer">
              <button type="button" onClick={handleButtonClick}>
                로그인
              </button>
              <button
                type="button"
                onClick={() => {
                  router.push('/signup');
                  setPlay(true);
                }}
              >
                회원가입
              </button>
            </div>
          </form>
        </LoginFormStyle>
      </main>
    </LoginContainer>
  );
};

export default main;
