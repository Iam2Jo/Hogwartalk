import cookies from 'react-cookies';
import axios from 'axios';
export function getToken() {
  const token = cookies.load('accessToken');
  return token;
}
//요청 인터셉터
axios.interceptors.request.use(
  async(config) => {
    config.headers['content-type'] = 'application/json';
    config.headers.serverId = '660d616b';
    // 헤더에 액세스 토큰을 추가
    const token = getToken();
    if (token === undefined) {
        const reAccessToken = await reissueAccessToken()
        cookies.save('accessToken',reAccessToken, { maxAge: 3600 * 24 * 7 });
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
  const res = axios.get('https://fastcampus-chat.net/auth/me');
  return (await res).data;
}

export async function signupUser(formData) {
  const resData = await axios.post(
    'https://fastcampus-chat.net/signup',
    formData,
  );
  if (resData.status === 200) {
    const responseData = await resData.data;
    console.log(responseData);
  }
}

export async function loginUser(loginData) {
  const resData = await axios.post(
    'https://fastcampus-chat.net/login',
    loginData,
  );
  if (resData.status === 200) {
    const responseData = await resData.data;
    return responseData;
  }
}

export async function checkUserIdAvailability(id){
    const resData = await axios.post('https://fastcampus-chat.net/check/id',{id:id})
    if (resData.status === 200) {
        const responseData = await resData.data;
        return responseData.isDuplicated;
    }
}

export async function reissueAccessToken() {
  const refreshToken = cookies.load('refreshToken');

  try {
    const response = await fetch('https://fastcampus-chat.net/refresh', {
      method: 'POST',
      headers: {
        serverId : '660d616b',
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