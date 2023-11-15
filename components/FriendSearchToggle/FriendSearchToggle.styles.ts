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
  padding: 20px;
  color: white;
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

export const TotalStudents = styled.div`
  display: flex;
  align-self: flex-start;
  margin-left: 10px;
`;

export const TotalStudentsLabel = styled.span`
  color: white;
  margin-right: 8px;
  font-size: 14px;
`;

export const TotalStudentsCount = styled.span`
  color: yellow;
  font-size: 14px;
`;

export const UserList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 0;

  max-height: 90vh;
  overflow-y: auto;
`;

export const UserItem = styled.div`
  border: 1px solid #4a4a4a;
  border-radius: 5px;

  padding: 15px;
  width: 17rem;
  margin: 5px auto;

  display: flex;
  align-items: center;
`;

export const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 0 10px;
  object-fit: cover;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 20px;
`;

export const Username = styled.span`
  font-size: 12px;
  color: white;
  padding-bottom: 2px;
`;

export const UserDormitory = styled.span`
  font-size: 12px;
  color: red;
`;

export const Emoji = styled.span`
  font-size: 6px;
  margin-left: 3px;
  vertical-align: middle;
`;

export const RefreshButton = styled.button`
  position: absolute;
  top: 10px;
  right: 13px;

  background: transparent;
  border: none;
  cursor: pointer;
`;

export const UserClass = styled.div`
  font-size: 10px;
  color: gray;
`;
