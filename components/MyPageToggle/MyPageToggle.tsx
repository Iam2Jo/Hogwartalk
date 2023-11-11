import React, { useState, useEffect } from 'react';
import * as styled from './MyPageToggle.styles';

interface MyPageToggleProps {
  isVisible: boolean;
  onClose: () => void;
}

interface User {
  id: string;
  name: string;
  picture: string;
}

interface ResponseValue {
  auth: boolean;
  user?: User;
}

const MyPageToggle: React.FC<MyPageToggleProps> = ({ isVisible, onClose }) => {
  const [userData, setUserData] = useState<User | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
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

        const response = await fetch('https://fastcampus-chat.net/auth/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            serverId: serverId,
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const data: ResponseValue = await response.json();
          if (data.auth && data.user) {
            setUserData(data.user);
          } else {
          }
        } else {
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (isVisible) {
      fetchData();
    }
  }, [isVisible]);

  return (
    <styled.Sidebar isVisible={isVisible}>
      <styled.CloseButton onClick={onClose}>
        <img src="/assets/icons/close.svg" alt="Close" />
      </styled.CloseButton>

      {userData && (
        <styled.ProfileSection>
          <styled.ProfileImage src={userData.picture} alt="Profile" />
          <styled.LabelsContainer>
            <styled.NameLabel>이름</styled.NameLabel>
            <styled.ActualName>{userData.name}</styled.ActualName>
          </styled.LabelsContainer>
          <styled.LabelsContainer>
            <styled.DormitoryLabel>기숙사</styled.DormitoryLabel>
            <styled.ActualDormitory>그리핀도르</styled.ActualDormitory>
          </styled.LabelsContainer>
        </styled.ProfileSection>
      )}
      <styled.EditButton>편집하기</styled.EditButton>
    </styled.Sidebar>
  );
};

export default MyPageToggle;
