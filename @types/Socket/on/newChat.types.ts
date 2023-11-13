export interface ResponseData {
  id: string;
  name: string;
  users: string[]; // 참여자들 id
  isPrivate: boolean;
  updatedAt: Date;
}
