export interface RequestBody {
  id: string; // 사용자 아이디 (필수!, 영어와 숫자만)
  password: string; // 사용자 비밀번호, 5자 이상 (필수!)
  name: string; // 사용자 이름, 20자 이하 (필수!)
  picture?: string; // 사용자 이미지(url or base64, under 1MB)
}

export interface ResponseValue {
  message: string; // title이 뭔지 모르겠음
}
