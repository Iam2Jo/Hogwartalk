import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import * as styled from './FriendSearchToggle.styles';

interface FriendSearchToggleProps {
  isVisible: boolean;
  onClose: () => void;
}

interface User {
  id: string;
  name: string;
  picture: string;
  isOnline?: boolean;
}

const FriendSearchToggle: React.FC<FriendSearchToggleProps> = ({
  isVisible,
  onClose,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

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

          // 친구 목록에서 자기 자신 제외
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

    if (isVisible && !initialized) {
      fetchUsers();
      setInitialized(true);
    }
  }, [isVisible, initialized]);

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

    const socket = io('https://fastcampus-chat.net', {
      extraHeaders: {
        'content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        serverId: serverId,
      },
    });

    socket.on('users-to-client', (data: { user: string[] }) => {
      const onlineUsers = data.user.map((userId) => ({
        id: userId,
        isOnline: true,
        ...users.find((u) => u.id === userId),
      }));
      setUsers(onlineUsers);
    });

    return () => {
      socket.disconnect();
    };
  }, [users]);

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
            </styled.UserInfo>
          </styled.UserItem>
        ))}
      </styled.UserList>
    </styled.Sidebar>
  );
};

export default FriendSearchToggle;
