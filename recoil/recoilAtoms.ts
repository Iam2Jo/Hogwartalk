import { atom } from 'recoil';

export interface User {
  id: string;
  name: string;
  picture: string;
}

export interface ResponseValue {
  auth: boolean;
  user?: User;
}

export const authState = atom<ResponseValue>({
  key: 'authState',
  default: {
    auth: false,
    user: undefined,
  },
});
