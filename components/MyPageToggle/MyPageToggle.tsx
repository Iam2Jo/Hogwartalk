import React from 'react';
import * as Styles from './MyPageToggle.styles';

interface MyPageToggleProps {
  isVisible: boolean;
  onClose: () => void;
}

const MyPageToggle: React.FC<MyPageToggleProps> = ({ isVisible, onClose }) => {
  return (
    <Styles.Sidebar isVisible={isVisible}>
      <Styles.CloseButton onClick={onClose}>
        <img src="/assets/icons/close.svg" alt="Close" />
      </Styles.CloseButton>{' '}
      <Styles.ProfileSection>
        <Styles.ProfileImage src="/assets/img/HarryPotter.png" alt="Profile" />
        <Styles.LabelsContainer>
          <Styles.NameLabel>이름</Styles.NameLabel>
          <Styles.ActualName>해리포터</Styles.ActualName>
        </Styles.LabelsContainer>
        <Styles.LabelsContainer>
          <Styles.DormitoryLabel>기숙사</Styles.DormitoryLabel>
          <Styles.ActualDormitory>그리핀도르</Styles.ActualDormitory>
        </Styles.LabelsContainer>
      </Styles.ProfileSection>
      <Styles.EditButton>편집하기</Styles.EditButton>
    </Styles.Sidebar>
  );
};

export default MyPageToggle;
