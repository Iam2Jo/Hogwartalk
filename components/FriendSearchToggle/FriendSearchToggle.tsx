import React, { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import * as styled from './FriendSearchToggle.styles';

// import { useFireFetch } from '@/hooks/useFireFetch';

// import { getUsersClass } from '@utils/firebase';
// import { doc, getDocs } from 'firebase/firestore';

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

interface ResponseData {
  user: string[];
}

const FriendSearchToggle: React.FC<FriendSearchToggleProps> = ({
  isVisible,
  onClose,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const [isConnected, setIsConnected] = useState([]);

  // 모든 유저 불러오기
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        const accessTokenCookie = document.cookie
          .split('; ')
          .find((row) => row.startsWith('accessToken='));

        if (!accessTokenCookie) {
          console.error('Access token not found in cookies');
          return;
        }

        const accessToken = accessTokenCookie.split('=')[1];

        const serverId = '660d616b';

        const response = await fetch('https://fastcampus-chat.net/users', {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            serverId: serverId,
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const data: User[] = await response.json();

          // console.log('All Users:', data); // 모든 유저 목록 콘솔 출력

          const myUserId = await checkDuplicateUserId(accessToken);
          if (myUserId !== null) {
            const onlineUsers = data.map((user) => ({
              id: user.id,
              isOnline: true,
              ...user,
            }));

            setUsers(onlineUsers.filter((user) => user.id !== myUserId));
          } else {
            console.error('Failed to fetch user information');
          }
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users', error);
      } finally {
        setLoading(false);
      }
    };

    if (isVisible) {
      fetchUsers();
      setInitialized(true);
    }
    fetchUsers();
  }, [isVisible]);

  // 접속 유무
  useEffect(() => {
    const accessTokenCookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('accessToken='));

    if (!accessTokenCookie) {
      console.error('Access token not found in cookies');
      return;
    }

    const accessToken = accessTokenCookie.split('=')[1];

    const serverId = '660d616b';

    const socket = io('https://fastcampus-chat.net/server', {
      extraHeaders: {
        'content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        serverId: serverId,
      },
    });

    try {
      socket.emit('users-server');
      console.log('C->S 접속 상태 유저 목록 fetch 성공!');
    } catch (error) {
      console.error('C->S 접속 상태 유저 목록 fetch 실패!', error);
    }

    socket.on('users-server-to-client', (response) => {
      console.log('접속 상태 유저 목록: ', response.users);
      console.log('S->C 접속 상태 유저 목록 pull 성공!');
      try {
        const connectedUserIds = response.users;
        const updatedUsers = users.map((user) => ({
          ...user,
          isOnline: connectedUserIds.includes(user.id),
        }));
        if (!arraysAreEqual(users, updatedUsers)) {
          setUsers(updatedUsers);
        }
      } catch (error) {
        console.error('S->C 접속 상태 유저 목록 pull 실패!', error);
      }
    });
    // 컴포넌트가 언마운트될 때 소켓 정리
    return () => {
      socket.disconnect();
    };
  }, []);
  // }, [users]); // 무한 호출 때문에 잠시 주석

  // const fireFetch = useFireFetch();

  // useEffect(() => {
  //   const fetchData = async (userId) => {
  //     try {
  //       // useFireFetch를 사용하여 id와 일치하는 데이터 가져오기
  //       const userData = await fireFetch.get('users', 'id', userId);

  //       if (userData.length > 0) {
  //         // userData에서 class 값을 가져와서 사용
  //         const userClass = userData[0].class;
  //         console.log('User Class:', userClass);
  //       } else {
  //         console.error('User not found');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
  //     }
  //   };

  //   // 예시로 userId를 '123'으로 가정
  //   fetchData('123');
  // }, []); // userId가 바뀌어야 할 경우, 해당 의존성 배열을 업데이트하세요.

  const checkDuplicateUserId = async (accessToken: string) => {
    try {
      const serverId = '660d616b';

      const response = await fetch('https://fastcampus-chat.net/auth/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          serverId: serverId,
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();

        if (data.auth && data.user) {
          return data.user.id;
        } else {
          console.error(
            'Authentication failed or user information not available.',
          );
          return null;
        }
      } else {
        console.error('Failed to fetch user information:', response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Error fetching user information:', error);
      return null;
    }
  };

  const arraysAreEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
      return false;
    }

    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }

    return true;
  };

  return (
    <styled.Sidebar isVisible={isVisible}>
      <styled.CloseButton onClick={onClose}>
        <img src="/assets/icons/close.svg" alt="Close" />
      </styled.CloseButton>
      <styled.TotalStudents>
        <styled.TotalStudentsLabel>전체 학생 수</styled.TotalStudentsLabel>
        <styled.TotalStudentsCount>{users.length}</styled.TotalStudentsCount>
      </styled.TotalStudents>
      <styled.UserList>
        {loading && <p>유저 목록 가져오는 중...</p>}
        {users.map((user) => (
          <styled.UserItem key={user.id}>
            <styled.ProfileImage
              src={user.picture}
              alt={`Profile of ${user.name}`}
            />
            <styled.UserInfo>
              <styled.Username>
                {user.name}{' '}
                <styled.Emoji>{user.isOnline ? '🟢' : '🔴'}</styled.Emoji>
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
