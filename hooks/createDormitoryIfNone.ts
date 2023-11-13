import axios from 'axios';
import { RequestBody as RequestBodyCreate } from '@/@types/RESTAPI/createChatting.types';
type ResponseValue = any;

const createDormitoryIfNone = (
  hasDormitory: boolean,
  chatData: ResponseValue | null,
  setChatId: React.Dispatch<React.SetStateAction<string>>,
  createChatUrl: string,
  requestData: RequestBodyCreate,
  headers: { [key: string]: string },
) => {
  if (!hasDormitory) {
    axios
      .post(createChatUrl, requestData, { headers })
      .then((response) => {
        console.log(`${requestData.name} 채팅방 생성 완료`, response.data);
        setChatId(response.data.id);
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
