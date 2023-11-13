import { atom } from 'recoil';

export const gryffindorChatInfoState = atom({
  key: 'gryffindorChatInfoState',
  default: {
    id: '',
    name: '',
    users: [],
    isPrivate: false,
    updatedAt: '',
    host: '',
  },
});

export const hufflepuffChatInfoState = atom({
  key: 'hufflepuffChatInfoState',
  default: {
    id: '',
    name: '',
    users: [],
    isPrivate: false,
    updatedAt: '',
    host: '',
  },
});

export const ravenclawChatInfoState = atom({
  key: 'ravenclawChatInfoState',
  default: {
    id: '',
    name: '',
    users: [],
    isPrivate: false,
    updatedAt: '',
    host: '',
  },
});

export const slytherinChatInfoState = atom({
  key: 'slytherinChatInfoState',
  default: {
    id: '',
    name: '',
    users: [],
    isPrivate: false,
    updatedAt: '',
    host: '',
  },
});
