import styled from 'styled-components';
import ChevronDown from '@assets/img/ChevronDown.svg';

interface MessageProps {
  $isCurrentUser: boolean;
}

interface ScrollToBottomButtonProps {
  $isVisible: boolean;
}

export const DormitoryContainer = styled.div`
  background-color: white;
  width: 100vw;
  height: 100vh;
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

export const MessageContainer = styled.div`
  background-color: black;
  width: 100%;
  height: 90%;
  overflow-y: auto;
  padding-right: 1rem;
`;

export const MessageWrapper = styled.div<MessageProps>`
  margin-bottom: 0.6rem;
  text-align: ${(props) => (props.$isCurrentUser ? 'right' : 'left')};
  margin-left: ${(props) => (props.$isCurrentUser ? 'auto' : '0')};
`;

export const MessageInfo = styled.div`
  margin-bottom: 0.3rem;
`;

export const MessageUserId = styled.span`
  color: #dddddd;
  font-weight: bold;
  margin-right: 0.5rem;
`;

export const MessageTime = styled.span`
  font-size: 0.8rem;
  color: #dddddd;
`;

export const MessageText = styled.span<MessageProps>`
  background-color: ${(props) =>
    props.$isCurrentUser ? '#F2CC00' : '#FFFFFF'};
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
`;

export const InputWrapper = styled.div`
  background-color: black;
  width: 100%;
  height: 10%;
  input {
    width: 80%;
    height: 100%;
    border-radius: 0.5rem;
  }
  button {
    background-color: #f2cc00;
    color: black;
    font-weight: bold;
    font-size: 1.2rem;
    width: 20%;
    height: 100%;
    border-radius: 0.5rem;
  }
`;

export const ScrollToBottomButton = styled.div<ScrollToBottomButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  z-index: 2;
  right: 8px;
  bottom: 88px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #4062ff;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.24);
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transform: scale(${({ $isVisible }) => ($isVisible ? 1 : 0)});
  transition: all 0.2s ease;
`;

export const BottomIcon = styled(ChevronDown)`
  margin: auto;
  height: 1.25rem;
  width: 1.25rem;
  fill: white;
`;
