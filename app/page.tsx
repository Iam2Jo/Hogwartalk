'use client';
import type { NextPage } from 'next';
import { Fragment, useState } from 'react';
import cookies from 'react-cookies';
import { LoginContainer, LoginFormStyle } from './loginStyle';
import { useRouter } from 'next/navigation';
type LoginData = {
  id: string;
  password: string;
};

async function loginUser(loginData: LoginData) {
  const res = await fetch('https://fastcampus-chat.net/login', {
    method: 'POST',
    body: JSON.stringify(loginData),
    headers: {
      'content-type': 'application/json',
      serverId: '660d616b',
    },
  });
  if (res.ok) {
    const tokenData = await res.json();
    return tokenData;
  }
}

const main: NextPage = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState<LoginData>({
    id: '',
    password: '',
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLoginData({ ...loginData, [id]: value });
  };
  const handleButtonClick = async () => {
    const token = await loginUser(loginData);
    cookies.save('acessToken', token.accessToken);
    cookies.save('refreshToken', token.refreshToken);
  };

  return (
    <LoginContainer>
      <header>
        <img src="/LoginTitle.png" alt="" />
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
            <footer>
              <button type="button" onClick={handleButtonClick}>
                등교하기
              </button>
              <button
                type="button"
                onClick={() => {
                  router.push('/signup');
                }}
              >
                입학하기
              </button>
            </footer>
          </form>
        </LoginFormStyle>
      </main>
    </LoginContainer>
  );
};

export default main;
