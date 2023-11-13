import { atom } from 'recoil';

export const gryffindorChatInfoState = atom({
  key: 'gryffindorChatInfoState',
  // default: {
    // id: '',
    // name: '',
    // users: [],
    // isPrivate: false,
    // updatedAt: '',
    // host: '',
  // },
  default: {
    id: '',
    name: 'gryffindor',
    users: ['harry', 'ron'],
    isPrivate: false,
    updatedAt: '2021-08-31T14:00:00.000Z',
    host: 'harry',
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
