import { atom } from 'recoil';

export const gryffindorChatInfoState = atom({
  key: 'gryffindorChatInfo',
  // default: {
  //   name: '',
  //   users: [],
  //   isPrivate: false,
  //   updatedAt: '',
  //   host: '',
  // },
  default: {
    name: 'gryffindor',
    users: ['harry', 'ron'],
    isPrivate: false,
    updatedAt: '2021-08-31T14:00:00.000Z',
    host: 'harry',
  },
});

export const hufflepuffChatInfoState = atom({
  key: 'hufflepuffChatInfo',
  default: {
    name: null,
    users: [],
    isPrivate: null,
    updatedAt: null,
  },
});

export const ravenclawChatInfoState = atom({
  key: 'ravenclawChatInfo',
  default: {
    name: null,
    users: [],
    isPrivate: null,
    updatedAt: null,
  },
});

export const slytherinChatInfoState = atom({
  key: 'slytherinChatInfo',
  default: {
    name: null,
    users: [],
    isPrivate: null,
    updatedAt: null,
  },
});
