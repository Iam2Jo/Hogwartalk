import React from 'react';
import * as Styles from './FriendSearchToggle.styles';

interface FriendSearchToggleProps {
  isVisible: boolean;
  onClose: () => void;
  //   totalStudents: number;
}

const FriendSearchToggle: React.FC<FriendSearchToggleProps> = ({
  isVisible,
  onClose,
  //   totalStudents,
}) => {
  return (
    <Styles.Sidebar isVisible={isVisible}>
      <Styles.CloseButton onClick={onClose}>
        <img src="/assets/icons/close.svg" alt="Close" />
      </Styles.CloseButton>
      <Styles.TotalStudents>
        <Styles.TotalStudentsLabel>전체 학생 수</Styles.TotalStudentsLabel>
        <Styles.TotalStudentsCount>30</Styles.TotalStudentsCount>
      </Styles.TotalStudents>
    </Styles.Sidebar>
  );
};

export default FriendSearchToggle;
