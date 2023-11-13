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

const MyPageToggle: React.FC<MyPageToggleProps> = ({ isVisible, onClose }) => {
  return (
    <styled.Sidebar isVisible={isVisible}>
      <styled.CloseButton onClick={onClose}>
        <img src="/assets/icons/close.svg" alt="Close" />
      </styled.CloseButton>
      <styled.ProfileSection>
        <styled.ProfileImage src="/assets/img/HarryPotter.png" alt="Profile" />
        <styled.LabelsContainer>
          <styled.NameLabel>이름</styled.NameLabel>
          <styled.ActualName>해리포터</styled.ActualName>
        </styled.LabelsContainer>
        <styled.LabelsContainer>
          <styled.DormitoryLabel>기숙사</styled.DormitoryLabel>
          <styled.ActualDormitory>그리핀도르</styled.ActualDormitory>
        </styled.LabelsContainer>
      </styled.ProfileSection>
      <styled.EditButton>편집하기</styled.EditButton>
    </styled.Sidebar>
  );
};

export default MyPageToggle;
