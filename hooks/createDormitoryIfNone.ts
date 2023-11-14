import axios from 'axios';
import { RequestBody as RequestBodyCreate } from '@/@types/RESTAPI/createChatting.types';
import { useFireFetch } from './useFireFetch';

type ResponseValue = any;

// 삭제 필요
interface DormChatInfo {
  id: string | null;
  name: string | null;
  users: string[];
  isPrivate: boolean | null;
  updatedAt: string | null;
  host: string | null;
}

const createDormitoryIfNone = (
  hasDormitory: boolean,
  chatData: ResponseValue | null,
  // setChatId: React.Dispatch<React.SetStateAction<string>>,
  createChatUrl: string,
  requestData: RequestBodyCreate,
  headers: { [key: string]: string },
  myName: string,
  // 삭제 필요
  setGryffindorChatInfo: React.Dispatch<React.SetStateAction<DormChatInfo>>,
) => {
  const firefetch = useFireFetch();

  if (!hasDormitory) {
    axios
      .post(createChatUrl, requestData, { headers })
      .then(async (response) => {
        console.log(`${requestData.name} 채팅방 생성 완료`, response.data);

        const newDormChatInfo = {
          id: response.data.id,
          name: response.data.name,
          users: response.data.users,
          isPrivate: response.data.isPrivate,
          updatedAt: response.data.updatedAt,
          host: myName,
        };

        await firefetch.add('chatInfo', newDormChatInfo);
        // setGryffindorChatInfo((prevChatInfo) => ({
        //   ...prevChatInfo,
        //   ...newDormChatInfo,
        // }));
      })
      .catch((error) => {
        console.error('Error sending the request:', error);
      });
  }
};

export default createDormitoryIfNone;
