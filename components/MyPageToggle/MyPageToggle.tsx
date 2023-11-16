import React, { useState, useEffect, useRef } from 'react';
import * as styled from './MyPageToggle.styles';
import { getUsersClass, getStorageURL, setStorageImage } from '@utils/firebase';

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
  const [ActualDormitory, setActualDormitory] = useState('');

  const fetchData = async () => {
    try {
      const accessTokenCookie = document.cookie
        .split('; ')
        .find((row) => row.startsWith('accessToken='));

      if (!accessTokenCookie) {
        // 쿠키에 액세스 토큰이 없는 경우
        return;
      }

      const accessToken = accessTokenCookie.split('=')[1];

      const serverId = process.env.NEXT_PUBLIC_SERVER_KEY;

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

          const imageURL = await getStorageURL(data.user.id);
          setUserData((prevUserData) => ({
            ...prevUserData,
            picture: imageURL,
          }));

          const userClass = await getUsersClass(data.user.id);
          if (userClass !== null) {
            setActualDormitory(userClass);
            console.log(userClass);
          }
          console.log(userClass);
        } else {
        }
      } else {
      }
    } catch (error) {
      console.error('사용자 정보 업데이트 오류:', error);
    }
  };

  useEffect(() => {
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
        picture: tempNewPicture,
      };

      const accessTokenCookie = document.cookie
        .split('; ')
        .find((row) => row.startsWith('accessToken='));

      if (!accessTokenCookie) {
        // 쿠키에 액세스 토큰이 없는 경우
        return;
      }

      const accessToken = accessTokenCookie.split('=')[1];

      const serverId = process.env.NEXT_PUBLIC_SERVER_KEY;

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
          picture: updatedData.user?.picture || userData.picture, //필요없음
        });

        fetchData();
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

        const reader = new FileReader();
        reader.onloadend = async () => {
          setTempNewPicture(reader.result as string);
          try {
            await setStorageImage(selectedFile, userData.id);
          } catch (error) {
            console.error('Firebase에 이미지 업로드 오류:', error);
          }
        };
        // reader.readAsDataURL(selectedFile);
        await handleImageResizeAndUpload(selectedFile);
      }
    } catch (error) {
      console.error('프로필 사진 변경 오류:', error);
      alert('프로필 사진 변경 오류');
    }
  };

  const ProfileImagePreview: React.FC<{ picture: string }> = ({ picture }) => (
    <styled.ProfileImagePreview src={picture} alt=" " />
  );

  const handleProfileImageChange = async () => {
    try {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    } catch (error) {
      console.error('프로필 사진 변경 오류:', error);
    }
  };

  const handleImageResizeAndUpload = async (file: File) => {
    const MAX_WIDTH = 500;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const image = new Image();
      image.src = reader.result as string;

      image.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;

        const scaleFactor = MAX_WIDTH / image.width;
        canvas.width = MAX_WIDTH;
        canvas.height = image.height * scaleFactor;

        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(async (blob) => {
          if (blob) {
            const resizedFile = new File([blob], file.name, {
              type: file.type,
            });
            setTempNewPicture(URL.createObjectURL(resizedFile));

            // 업로드
            try {
              await setStorageImage(resizedFile, userData.id);
            } catch (error) {
              console.error('Firebase에 이미지 업로드 오류:', error);
            }
          }
        }, file.type);
      };
    };
    reader.readAsDataURL(file);
  };

  return (
    <styled.Sidebar isVisible={isVisible}>
      <styled.CloseButton onClick={onClose}>
        <img src="/assets/icons/close.svg" alt="Close" />
      </styled.CloseButton>

      {userData && (
        <styled.ProfileSection>
          {editMode ? (
            <>
              <styled.ProfileImage src={tempNewPicture} alt="" />
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
                <styled.ActualDormitory>
                  {ActualDormitory}
                </styled.ActualDormitory>
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
                <styled.ActualDormitory>
                  {ActualDormitory}
                </styled.ActualDormitory>
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
