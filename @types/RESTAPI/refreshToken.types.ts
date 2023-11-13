export interface RequestBody {
  refreshToken: string; // access token 발급용 토큰
}

export interface ResponseValue {
  accessToken: string; // 사용자 접근 토큰
}
