export type ResponseValue = Chat[];

export interface Chat {
  id: string;
  name: string;
  users: User[]; // 속한 유저 id
  isPrivate: boolean;
  latestMessage: Message | null;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  picture: string;
}

export interface Message {
  id: string;
  text: string;
  userId: string;
  createAt: Date;
}
