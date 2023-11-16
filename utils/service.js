import cookies from 'react-cookies';
import axios from 'axios';
export function getToken() {
  const token = cookies.load('accessToken');
  return token;
}
export function getRefreshToken() {
  const token = cookies.load('refreshToken');
  return token;
}
//요청 인터셉터
axios.interceptors.request.use(
  async (config) => {
    config.headers['content-type'] = 'application/json';
    config.headers.serverId = process.env.NEXT_PUBLIC_SERVER_KEY;
    // 헤더에 액세스 토큰을 추가
    const token = getToken();
    if (token === undefined) {
      const reAccessToken = await reissueAccessToken();
      cookies.save('accessToken', reAccessToken, { maxAge: 3600 * 24 * 7 });
      config.headers.Authorization = `Bearer ${reAccessToken}`;
    } else {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request Interceptor Error:', error);
    return Promise.reject(error);
  },
);

export async function getUserdata() {
  try {
    const res = axios.get('https://fastcampus-chat.net/auth/me');
    return (await res).data;
  } catch (error) {
    console.log(error, '유저데이터를 가져오지 못했습니다.');
  }
}

export async function signupUser(formData) {
  try {
    const resData = await axios.post(
      'https://fastcampus-chat.net/signup',
      formData,
    );
    if (resData.status === 200) {
      const responseData = await resData.data;
      console.log(responseData);
    }
    console.log(resData);
  } catch (error) {
    console.log(error, '회원가입이 실패했습니다.');
  }
}

export async function loginUser(loginData) {
  try {
    const resData = await axios.post(
      'https://fastcampus-chat.net/login',
      loginData,
    );
    console.log(resData);
    if (resData.status === 200) {
      const responseData = await resData.data;
      return responseData;
    }
  } catch (error) {
    console.log(error, '로그인이 실패했습니다.');
  }
}

export async function checkUserIdAvailability(id) {
  try {
    const resData = await axios.post('https://fastcampus-chat.net/check/id', {
      id: id,
    });
    if (resData.status === 200) {
      const responseData = await resData.data;
      return responseData.isDuplicated;
    }
  } catch (error) {
    console.log(error, '아이디 중복검사에 실패했습니다.!');
  }
}

export async function reissueAccessToken() {
  const refreshToken = cookies.load('refreshToken');

  try {
    const response = await fetch('https://fastcampus-chat.net/refresh', {
      method: 'POST',
      headers: {
        serverId: '660d616b',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken: refreshToken }),
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData.accessToken;
    } else {
      console.error('Failed to reissue access token:', response.statusText);
      // 실패할 경우 예외 처리 또는 다른 로직 추가
    }
  } catch (error) {
    console.error('Error during reissueAccessToken:', error);
    // 네트워크 오류 등의 예외 처리
  }
}
