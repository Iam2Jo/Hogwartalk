import styled from 'styled-components';

export const Sidebar = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 50px;
  left: ${(props) => (props.isVisible ? '0' : '-300px')};
  width: 300px;
  height: 100vh;
  background-color: rgba(3, 3, 3, 0.84);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transition: left 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 13px;
  background: transparent;
  border: none;
  cursor: pointer;

  img {
    width: 15px;
    height: 15px;
  }
`;

export const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProfileImage = styled.img`
  width: 11.25rem;
  height: 11.25rem;
  border-radius: 50%;
  border: 3px solid #d32b2b;
  margin: 3.125rem 0;
  object-fit: cover;
`;

export const LabelsContainer = styled.div`
  margin-bottom: 5px;
  align-self: flex-start;
  display: flex;
  flex-direction: column;
`;

export const NameLabel = styled.p`
  font-size: 12px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 10px;
  display: inline-block;
`;

export const ActualName = styled.p`
  font-size: 12px;
  color: #fff;
  margin-bottom: 20px;
  display: inline-block;
`;

export const DormitoryLabel = styled.p`
  font-size: 12px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 10px;
  display: inline-block;
`;

export const ActualDormitory = styled.p`
  font-size: 12px;
  color: #fff;
  display: inline-block;
`;

export const EditButton = styled.button`
  background-color: #000;
  color: #fff;
  font-size: 12px;
  margin-bottom: 70px;

  padding: 5px 90px;
  border: 2px solid rgba(255, 255, 255, 0.15);
  cursor: pointer;
`;
