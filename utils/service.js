import cookies from 'react-cookies';
import axios from 'axios';
export function getToken() {
  const token = cookies.load('accessToken');
  return token;
}
//요청 인터셉터
axios.interceptors.request.use(
  (config) => {
    config.headers['content-type'] = 'application/json';
    config.headers.serverId = '660d616b';
    // 헤더에 액세스 토큰을 추가
    const token = getToken();
    if (token !== undefined) {
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
