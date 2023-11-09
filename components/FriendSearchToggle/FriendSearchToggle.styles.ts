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
