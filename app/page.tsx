'use client';
import type { NextPage } from 'next';
import { Fragment, useState } from 'react';
import cookies from 'react-cookies';

type LoginData = {
  id: string,
  password:string
}

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
  const [loginData, setLoginData] = useState<any>({
    id: '',
    password: '',
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLoginData({ ...loginData, [id]: value });
  };
  const handleButtonClick = async () => {
    const token = await loginUser(loginData);
    cookies.save('acessToken',token.accessToken);
    cookies.save('refreshToken',token.refreshToken);
  };
  return (
    <Fragment>
      <header>
        <img src="" alt="" />
      </header>
      <main>
        <form>
          <div>
            <label htmlFor="id">아이디</label>
            <input
              type="text"
              name=""
              id="id"
              value={loginData.id}
              onChange={handleInputChange}
            />
          </div>
          <div>
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
            <button type="button">입학하기</button>
          </footer>
        </form>
      </main>
    </Fragment>
  );
};

export default main;
