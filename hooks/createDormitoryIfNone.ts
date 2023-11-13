import axios from 'axios';
import { RequestBody as RequestBodyCreate } from '@/@types/RESTAPI/createChatting.types';
import * as dormChatInfo from '@/recoil/dormChatInfo';
import { useSetRecoilState } from 'recoil';

type ResponseValue = any;

interface DormChatInfo {
  name: string | null;
  users: string[];
  isPrivate: boolean | null;
  updatedAt: string | null;
  host: string | null;
}

const createDormitoryIfNone = (
  hasDormitory: boolean,
  chatData: ResponseValue | null,
  setChatId: React.Dispatch<React.SetStateAction<string>>,
  createChatUrl: string,
  requestData: RequestBodyCreate,
  headers: { [key: string]: string },
  myName: string,
) => {
  const setGryffindorChatInfo = useSetRecoilState(
    dormChatInfo.gryffindorChatInfoState,
  );
  if (!hasDormitory) {
    axios
      .post(createChatUrl, requestData, { headers })
      .then((response) => {
        console.log(`${requestData.name} 채팅방 생성 완료`, response.data);
        setChatId(response.data.id);

        let host = '';
        if (response.data.users.includes(myName)) {
          host = myName;
        }

        const dormChatInfo: DormChatInfo = {
          name: response.data.name,
          users: response.data.users,
          isPrivate: response.data.isPrivate,
          updatedAt: response.data.updatedAt,
          host,
        };
        setGryffindorChatInfo(dormChatInfo);
      })
      .catch((error) => {
        console.error('Error sending the request:', error);
      });
  } else {
    if (chatData) {
      for (let i = chatData.chats.length - 1; i >= 0; i--) {
        if (chatData.chats[i].name === requestData.name) {
          setChatId(chatData.chats[i].id);
          break;
        }
      }
    }
  }
};

export default createDormitoryIfNone;
