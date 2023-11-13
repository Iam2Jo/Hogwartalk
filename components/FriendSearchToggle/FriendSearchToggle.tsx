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

  useEffect(() => {
    fetchUsers();
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

  const fetchUsers = async () => {
    try {
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
        setUsers(data);
      } else {
        console.error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users', error);
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
