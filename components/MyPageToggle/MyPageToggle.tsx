// import React, { useEffect } from 'react';
// import { useRecoilState } from 'recoil';
// import * as styled from './MyPageToggle.styles';
// import { authState, User } from '@recoil/recoilAtoms';

// interface MyPageToggleProps {
//   isVisible: boolean;
//   onClose: () => void;
// }

// const MyPageToggle: React.FC<MyPageToggleProps> = ({ isVisible, onClose }) => {
//   const [userData, setUserData] = useRecoilState(authState);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const accessToken =
//           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGQ2MTZiOmhhcnJ5cG90dGVyIiwiaWF0IjoxNjk5MzQ1NDkzLCJleHAiOjE2OTk5NTAyOTN9.b5s4_9f-pVBj9ki17SXc6VvoiApMJZCJXfk5G2wskyo';
//         const serverId = 'nREmPe9B';

//         const response = await fetch('https://fastcampus-chat.net/auth/me', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             serverId: serverId,
//             Authorization: `Bearer ${accessToken}`,
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           if (data.auth && data.user) {
//             setUserData(data.user);
//           } else {
//             // 인증 실패 또는 사용자 데이터가 없는 경우
//             setUserData({
//               auth: false,
//               user: undefined,
//             });
//           }
//         } else {
//           // 서버가 오류를 반환하는 경우
//           setUserData({
//             auth: false,
//             user: undefined,
//           });
//         }
//       } catch (error) {
//         console.error('유저 데이터를 불러오는 중 오류 발생:', error);
//         setUserData({
//           auth: false,
//           user: undefined,
//         });
//       }
//     };

//     if (isVisible) {
//       fetchData();
//     }
//   }, [isVisible, setUserData]);

//   return (
//     <styled.Sidebar isVisible={isVisible}>
//       <styled.CloseButton onClick={onClose}>
//         <img src="/assets/icons/close.svg" alt="Close" />
//       </styled.CloseButton>
//       {userData.auth ? (
//         <styled.ProfileSection>
//           <styled.ProfileImage src={userData.user?.picture} alt="Profile" />
//           <styled.LabelsContainer>
//             <styled.NameLabel>이름</styled.NameLabel>
//             <styled.ActualName>{userData.user?.name}</styled.ActualName>
//           </styled.LabelsContainer>
//           <styled.LabelsContainer>
//             <styled.DormitoryLabel>기숙사</styled.DormitoryLabel>
//             <styled.ActualDormitory>그리핀도르</styled.ActualDormitory>
//           </styled.LabelsContainer>
//         </styled.ProfileSection>
//       ) : (
//         <styled.PleaseLoginText>로그인을 해주세요!</styled.PleaseLoginText>
//       )}
//       <styled.EditButton>편집하기</styled.EditButton>
//     </styled.Sidebar>
//   );
// };

// export default MyPageToggle;

////////////////////////////////////////////////////////////////////////
// 리코일 사용 X
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
        const accessToken =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGQ2MTZiOmhhcnJ5cG90dGVyIiwiaWF0IjoxNjk5MzQ1NDkzLCJleHAiOjE2OTk5NTAyOTN9.b5s4_9f-pVBj9ki17SXc6VvoiApMJZCJXfk5G2wskyo';
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
