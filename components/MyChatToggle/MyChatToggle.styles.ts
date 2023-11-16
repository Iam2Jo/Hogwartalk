import styled from 'styled-components';

interface MyChattingProps {
  $isCurrentChat: boolean;
}

export const MyChattingContainer = styled.div<{ isVisible: boolean }>`
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

  overflow-y: hidden;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #1f1f1f;
    border-radius: 5px;
  }

  ::-webkit-scrollbar-track {
    background-color: black;
  }
`;

export const MyChattingWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding-right: 1rem;
`;

export const Label = styled.div`
  margin-bottom: 1rem;
`;

export const Title = styled.span`
  font-size: 1.3rem;
  font-weight: bold;
  margin-right: 0.5rem;
  color: white;
`;

export const Length = styled.span`
  font-size: 1.3rem;
  color: #f2cc00;
`;

export const MyChatting = styled.div<MyChattingProps>`
  cursor: pointer;
  height: 5rem;
  color: #d1d1d1;
  padding: 1rem 1.2rem;
  margin-bottom: 1rem;
  background-color: black;
  border: ${(props) =>
    props.$isCurrentChat ? '1px solid #f2cc00' : '1px solid #4a4a4a'};
  border-radius: 0.5rem;

  &:hover {
    border: 1px solid #f2cc00;
    background: #191919;
    color: var(--color-main-yellow);
    box-shadow: 0px 0px 20px 0px rgba(242, 204, 0, 0.49);
  }
`;

export const ChattingInfo = styled.div`
  gap: 1rem;
  display: flex;
  justify-content: space-between;
`;

export const ChatName = styled.div<MyChattingProps>`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  max-width: 100%;
  color: ${(props) => (props.$isCurrentChat ? '#f2cc00' : '#d1d1d1')};
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.2rem;
`;

export const ChatUsersLength = styled.div`
  color: white;
  margin-left: 0.2rem;
`;

export const ChatTime = styled.span<MyChattingProps>`
  margin-left: auto;
  color: ${(props) => (props.$isCurrentChat ? '#f2cc00' : '#d1d1d1')};
`;

export const LatestMessage = styled.span<MyChattingProps>`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  max-width: 100%;
  color: ${(props) => (props.$isCurrentChat ? '#f2cc00' : '#d1d1d1')};
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
