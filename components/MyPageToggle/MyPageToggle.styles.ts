import styled from 'styled-components';

export const Sidebar = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 50px;
  left: ${(props) => (props.isVisible ? '0' : '-300px')};
  width: 20rem;
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
  width: 13rem;
  height: 13rem;
  border-radius: 50%;
  margin: 3.125rem 0;
  object-fit: cover;

  border: 2px solid #f2cc00;
  background: #191919;
  color: var(--color-main-yellow);
  box-shadow: 0px 0px 20px 0px rgba(242, 204, 0, 0.49);
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
  margin-bottom: 20px;
`;

export const ProfileImageLabel = styled.p`
  font-size: 12px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 10px;
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

export const PleaseLoginText = styled.p`
  color: white;
  font-size: 12px;
`;

export const EditInput = styled.input`
  font-size: 12px;
  margin-bottom: 16px;
  display: inline-block;
  background-color: black;
  color: white;
`;

export const FlexContainer = styled.div`
  display: flex;

  background-color: #000;
  color: #fff;
  font-size: 10px;
  margin-bottom: 50px;

  cursor: pointer;
`;

export const SaveButton = styled.button`
  font-size: 12px;
  margin-bottom: 16px;
  display: inline-block;
  background-color: black;
  color: white;

  margin-right: 10px;
  padding: 5px 30px;
  border: 2px solid rgba(255, 255, 255, 0.15);
  cursor: pointer;
`;

export const CancelButton = styled.button`
  font-size: 12px;
  margin-bottom: 16px;
  display: inline-block;
  background-color: black;
  color: white;

  padding: 5px 30px;
  border: 2px solid rgba(255, 255, 255, 0.15);
  cursor: pointer;
`;

export const ProfileImageEditButton = styled.button`
  font-size: 12px;
  margin-bottom: 16px;
  display: inline-block;
  background-color: black;
  color: white;

  padding: 5px 15px;
  border: 2px solid rgba(255, 255, 255, 0.15);
  cursor: pointer;
`;

export const ProfileImagePreview = styled.img`
  width: 3rem;
  height: 3rem;
  margin-left: 4rem;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.15);
  font-size: 11px;

  object-fit: cover;
`;
