import axios from 'axios';
import { RequestBody as RequestBodyCreate } from '@/@types/RESTAPI/createChatting.types';
import { addFirebaseData } from '@hooks/useFireFetch';

const createDormitoryIfNone = async (
  hasDormitory: boolean,
  createChatUrl: string,
  requestData: RequestBodyCreate,
  headers: { [key: string]: string },
  dormName: string,
  myName: string,
) => {
  if (!hasDormitory) {
    try {
      const response = await axios.post(createChatUrl, requestData, {
        headers,
      });

      const newDormChatInfo = {
        id: response.data.id,
        name: response.data.name,
        users: response.data.users,
        isPrivate: response.data.isPrivate,
        updatedAt: response.data.updatedAt,
        host: myName,
      };

      await addFirebaseData('chatInfo', dormName, newDormChatInfo);
      console.log(`${requestData.name} 채팅방 생성 완료`, response.data);
    } catch (error) {
      console.error('Error sending the request:', error);
    }
  }
};

export default createDormitoryIfNone;
