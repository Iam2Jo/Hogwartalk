export interface RequestBody {
  id: string; // 사용자 아이디 (필수!, 영어와 숫자만)
}

export interface ResponseValue {
  isDuplicated: boolean;
}
