import React, { useState, useEffect } from 'react';
import * as Styles from './FriendSearchToggle.styles';

interface FriendSearchToggleProps {
  isVisible: boolean;
  onClose: () => void;
}

interface User {
  id: string;
  name: string;
  picture: string;
}

const FriendSearchToggle: React.FC<FriendSearchToggleProps> = ({
  isVisible,
  onClose,
}) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const accessTokenCookie = document.cookie
          .split('; ')
          .find((row) => row.startsWith('acessToken='));

        if (!accessTokenCookie) {
          // 쿠키에 액세스 토큰이 없는 경우
          return;
        }
        const accessToken = accessTokenCookie.split('=')[1];

        const serverId = 'nREmPe9B';

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
          alert('Success');
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Styles.Sidebar isVisible={isVisible}>
      <Styles.CloseButton onClick={onClose}>
        <img src="/assets/icons/close.svg" alt="Close" />
      </Styles.CloseButton>
      <Styles.TotalStudents>
        <Styles.TotalStudentsLabel>전체 학생 수</Styles.TotalStudentsLabel>
        <Styles.TotalStudentsCount>{users.length}</Styles.TotalStudentsCount>
      </Styles.TotalStudents>

      <Styles.UserList>
        {users.map((user) => (
          <Styles.UserItem key={user.id}>
            <Styles.ProfileImage
              src={user.picture}
              alt={`Profile of ${user.name}`}
            />
            <Styles.UserInfo>
              <Styles.Username>
                {user.name} <Styles.Emoji>🟢</Styles.Emoji>
              </Styles.Username>
            </Styles.UserInfo>
          </Styles.UserItem>
        ))}
      </Styles.UserList>
    </Styles.Sidebar>
  );
};

export default FriendSearchToggle;
