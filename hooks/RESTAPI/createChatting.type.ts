export interface RequestBody {
  name: string; // chat 이름
  users: string[]; // 참가자들 id(자신 미포함)
  isPrivate?: boolean; // 공개 비공개
}

export interface ResponseValue {
  id: string;
  name: string;
  users: User[]; // 자신을 포함한 참가자들 정보
  isPrivate: boolean;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  picture: string;
}
