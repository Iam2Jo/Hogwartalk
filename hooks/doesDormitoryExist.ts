import { useEffect } from 'react';

const useFindDorm = (dormitoryName, chatData, setDormitoryState) => {
  if (chatData) {
    let isThere = false;
    for (let i = 0; i < chatData.chats.length; i++) {
      if (chatData.chats[i].name === dormitoryName) {
        isThere = true;
        console.log(`${dormitoryName} 기숙사가 이미 있습니다!`);
        break;
      }
    }
    setDormitoryState(true);

    if (!isThere) {
      console.log(`${dormitoryName} 기숙사가 없습니다!`);
      setDormitoryState(false);
    }
  }
};

export const doesDormitoryExist = (
  dormitoryName,
  chatData,
  setDormitoryState,
) => {
  useEffect(() => {
    useFindDorm(dormitoryName, chatData, setDormitoryState);
  }, [chatData]);
};
