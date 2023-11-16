export interface RequestBody {
  chatId: string;
  users: string[]; // 초대할 유저 id
}

export interface ResponseValue {
  id: string;
  name: string;
  users: User[]; // 속한 유저 정보
  isPrivate: boolean;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  picture: string;
}
