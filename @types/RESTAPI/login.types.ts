export interface RequestBody {
  id: string; // 사용자 아이디 (필수!)
  password: string; // 사용자 비밀번호 (필수!)
}

export interface ResponseValue {
  accessToken: string; // 사용자 접근 토큰
  refreshToken: string; // access token 발급용 토큰
}
