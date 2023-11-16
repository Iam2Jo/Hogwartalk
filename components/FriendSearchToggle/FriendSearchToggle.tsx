import React, { useState, useEffect, useMemo } from 'react';
// import io, { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';
import * as styled from './FriendSearchToggle.styles';
// import { getUsersClass } from '@utils/firebase';
import {
  useServerFetchUsers,
  useServerPullUsers,
} from '@hooks/useChatSocketHooks';
import axios from 'axios';
import { getFirebaseDatabyKeyVal } from '@hooks/useFireFetch';

interface FriendSearchToggleProps {
  isVisible: boolean;
  onClose: () => void;
}

interface User {
  id: string;
  name: string;
  picture: string;
  isOnline?: boolean;
  class?: string;
}

const FriendSearchToggle: React.FC<FriendSearchToggleProps> = ({
  isVisible,
  onClose,
}) => {
  // const [users, setUsers] = useState<User[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [initialized, setInitialized] = useState(false);
  const [isConnected, setIsConnected] = useState([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  const accessTokenCookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith('accessToken='));

  if (!accessTokenCookie) {
    console.error('Access token not found in cookies');
    return;
  }

  const GET_ALL_USERS_URL = process.env.NEXT_PUBLIC_GET_ALL_USERS_URL;
  const SERVER_KEY = process.env.NEXT_PUBLIC_SERVER_KEY;
  const ACCESS_TOKEN = accessTokenCookie.split('=')[1];
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    serverId: SERVER_KEY,
  };

  const socket = useMemo(() => {
    return io('https://fastcampus-chat.net/server', {
      extraHeaders: headers,
    });
  }, [ACCESS_TOKEN]);

  useEffect(() => {
    axios
      .get(GET_ALL_USERS_URL, { headers })
      .then(async (response) => {
        console.log('모든 유저: ', response.data);

        const allUsersFromRes = response.data;

        const allUsersFromDB = await getFirebaseDatabyKeyVal('users');
        const tmpArr = allUsersFromRes.map((userRes) => {
          const matchingData = allUsersFromDB.find(
            (userDB) => userDB.id === userRes.id,
          );

          return matchingData
            ? { ...userRes, class: matchingData.class }
            : userRes;
        });

        setAllUsers(tmpArr);
      })
      .catch((error) => {
        console.error('초대 가능한 유저 불러오기 실패!', error);
      });
  }, []);

  const handlePullUsers = (response) => {
    console.log('접속 상태 유저 목록(server): ', response.users);
    console.log('S->C 접속 상태 유저 목록 pull 성공!(server)');
    setIsConnected(response.users);
  };

  useEffect(() => {
    const fetchDataAndAttachListeners = async () => {
      try {
        await useServerFetchUsers(socket);
        useServerPullUsers(socket, handlePullUsers);
      } catch (error) {
        console.error(
          '데이터 가져오기 또는 이벤트 리스너 추가 중 오류 발생:',
          error,
        );
      }
    };

    fetchDataAndAttachListeners();

    return () => {
      console.log('클린업 함수 호출됨');
      socket.off('users-server-to-client', handlePullUsers);
    };
  }, [socket, handlePullUsers]);

  const getStatusCircleColor = (participant: string): string => {
    const isUserConnected = isConnected?.includes(participant);

    return isUserConnected ? '🟢' : '🔴';
  };

  return (
    <styled.Sidebar isVisible={isVisible}>
      <styled.CloseButton onClick={onClose}>
        <img src="/assets/icons/close.svg" alt="Close" />
      </styled.CloseButton>
      <styled.TotalStudents>
        <styled.TotalStudentsLabel>전체 학생 수</styled.TotalStudentsLabel>
        <styled.TotalStudentsCount>{allUsers.length}</styled.TotalStudentsCount>
      </styled.TotalStudents>
      <styled.UserList>
        {/* {loading && <p>유저 목록 가져오는 중...</p>} */}
        {allUsers.map((user) => (
          <styled.UserItem key={user.id}>
            <styled.ProfileImage
              src={user.picture}
              alt={`Profile of ${user.name}`}
            />
            <styled.UserInfo>
              <styled.Username>
                {user.name}{' '}
                <styled.Emoji>{getStatusCircleColor(user.id)}</styled.Emoji>
              </styled.Username>
              {user.class && <styled.UserClass>{user.class}</styled.UserClass>}
            </styled.UserInfo>
          </styled.UserItem>
        ))}
      </styled.UserList>
    </styled.Sidebar>
  );
};

export default FriendSearchToggle;
