export interface RequestBody {
  chatId: string;
}

export interface ResponseValue {
  id: string;
  name: string;
  users: User[]; // 속한 유저 id
  isPrivate: boolean;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  picture: string;
}
