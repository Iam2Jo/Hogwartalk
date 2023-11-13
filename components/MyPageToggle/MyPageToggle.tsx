<<<<<<< HEAD
import React, { useState, useEffect, useRef } from 'react';
=======
import React, { useState, useEffect } from 'react';
>>>>>>> a0c020d7d2f7815ac6d0cbfd2aabd026ef7eea80
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

interface RequestBody {
  name?: string;
  picture?: string;
}

const MyPageToggle: React.FC<MyPageToggleProps> = ({ isVisible, onClose }) => {
  const [userData, setUserData] = useState<User | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPicture, setNewPicture] = useState('');
  const [tempNewPicture, setTempNewPicture] = useState('');

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
        console.error('사용자 정보 업데이트 오류:', error);
      }
    };

    if (isVisible) {
      fetchData();
    }
  }, [isVisible]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      const requestBody: RequestBody = {
        name: newName,
        picture: newPicture || tempNewPicture,
      };

      const accessTokenCookie = document.cookie
        .split('; ')
        .find((row) => row.startsWith('acessToken='));

      if (!accessTokenCookie) {
        // 쿠키에 액세스 토큰이 없는 경우
        return;
      }

      const accessToken = accessTokenCookie.split('=')[1];

      const serverId = 'nREmPe9B';

      const response = await fetch('https://fastcampus-chat.net/user', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          serverId: serverId,
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const updatedData: ResponseValue = await response.json();
        setUserData({
          ...userData,
          name: updatedData.user?.name || userData.name,
          picture: updatedData.user?.picture || userData.picture,
        });
        setNewPicture(tempNewPicture);
      } else {
        console.error('사용자 정보 업데이트 오류:', response.statusText);
      }
    } catch (error) {
      console.error('사용자 정보 업데이트 오류:', error);
    }
    setEditMode(false);
  };

  const handleCancelClick = () => {
    setEditMode(false);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  /////////////// 프로필 이미지 변경

  // 파일 크기를 확인하는 함수 (1MB 미만인지 확인)
  const checkFileSize = (file: File): boolean => {
    const fileSizeInBytes = file.size;
    const maxSize = 1024 * 1024;
    return fileSizeInBytes <= maxSize;
  };

  const fileInputRef = useRef(null);

  const handleProfileImageChange = async () => {
    try {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    } catch (error) {
      console.error('프로필 사진 변경 오류:', error);
    }
  };

  const handleFileInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    try {
      const selectedFile = e.target.files?.[0];

      if (selectedFile) {
        if (!checkFileSize(selectedFile)) {
          console.error('파일 크기가 1MB를 초과합니다.');
          alert('파일 크기가 1MB를 초과합니다.');
          return;
        }

        console.log(selectedFile);

        const blobUrl = URL.createObjectURL(selectedFile);

        console.log(blobUrl);

        setTempNewPicture(blobUrl);
      }
    } catch (error) {
      console.error('프로필 사진 변경 오류:', error);
      alert('프로필 사진 변경 오류');
    }
  };

  const ProfileImagePreview: React.FC<{ picture: string }> = ({ picture }) => (
    <styled.ProfileImagePreview src={picture} alt="Preview" />
  );

  return (
    <styled.Sidebar isVisible={isVisible}>
      <styled.CloseButton onClick={onClose}>
        <img src="/assets/icons/close.svg" alt="Close" />
      </styled.CloseButton>

      {userData && (
        <styled.ProfileSection>
          {editMode ? (
            <>
              <styled.ProfileImage src={userData.picture} alt="Profile" />
              <styled.LabelsContainer>
                <styled.NameLabel>이름</styled.NameLabel>
                <styled.EditInput
                  type="text"
                  placeholder="New Name"
                  value={newName}
                  onChange={handleNameChange}
                />
              </styled.LabelsContainer>
              <styled.LabelsContainer>
                <styled.DormitoryLabel>기숙사</styled.DormitoryLabel>
                <styled.ActualDormitory>그리핀도르</styled.ActualDormitory>
              </styled.LabelsContainer>
              <styled.LabelsContainer>
                <styled.ProfileImageLabel>대표사진</styled.ProfileImageLabel>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileInputChange}
                />
                <styled.FlexContainer>
                  <styled.ProfileImageEditButton
                    onClick={handleProfileImageChange}
                  >
                    첨부하기
                  </styled.ProfileImageEditButton>
                  <ProfileImagePreview picture={tempNewPicture} />
                </styled.FlexContainer>
              </styled.LabelsContainer>
            </>
          ) : (
            <>
              <styled.ProfileImage src={userData.picture} alt="Profile" />
              <styled.LabelsContainer>
                <styled.NameLabel>이름</styled.NameLabel>
                <styled.ActualName>{userData.name}</styled.ActualName>
              </styled.LabelsContainer>
              <styled.LabelsContainer>
                <styled.DormitoryLabel>기숙사</styled.DormitoryLabel>
                <styled.ActualDormitory>그리핀도르</styled.ActualDormitory>
              </styled.LabelsContainer>
            </>
          )}
        </styled.ProfileSection>
      )}

      {!editMode && (
        <styled.EditButton onClick={handleEditClick}>
          편집하기
        </styled.EditButton>
      )}
      {editMode && (
        <styled.FlexContainer>
          <styled.SaveButton onClick={handleSaveClick}>
            저장하기
          </styled.SaveButton>
          <styled.CancelButton onClick={handleCancelClick}>
            취소하기
          </styled.CancelButton>
        </styled.FlexContainer>
      )}
    </styled.Sidebar>
  );
};

export default MyPageToggle;
