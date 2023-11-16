import styled from 'styled-components';
import ChevronDown from '@assets/img/ChevronDown.svg';
import PersonSVG from '@assets/img/Person.svg';
import MoreSVG from '@assets/img/More.svg';

interface MessageProps {
  $isCurrentUser: boolean;
}

interface ScrollToBottomButtonProps {
  $isVisible: boolean;
}

export const MoreItemContainer = styled.button`
  background: black;
  color: var(--color-white);
  padding: 1rem;
  position: absolute;
  top: 13%;
  right: 3%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 15%;
  height: 12%;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

export const DormitoryContainer = styled.div`
  background-color: #1f1f1f;
  width: 73.4vw;
  height: calc(100vh -2rem); // 패딩 1rem 해줬어서
  margin-top: 2rem; // header

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

export const DormitoryHeader = styled.div`
  background-color: black;
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.5rem;
  font-weight: bold;
  color: #f2cc00;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
`;

export const MessageContainer = styled.div`
  background-color: #000000;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  width: 100%;
  height: 75%;
  overflow-y: auto;
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
  margin-top: 0.8rem;
  display: flex;
  justify-content: center;
  background-color: #1f1f1f;
  width: 100%;
  height: 10%;
  input {
    width: 78%;
    height: 100%;
    border-radius: 0.5rem;
    border: none;
    margin-right: 1rem;
    outline: none;
  }
  button {
    background-color: #f2cc00;
    color: black;
    font-weight: bold;
    font-size: 1.2rem;
    width: 20%;
    height: 100%;
    border-radius: 0.5rem;
    border: none;
    cursor: pointer;
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

export const PersonIcon = styled(PersonSVG)`
  transform: scale(0.7);
  margin-right: 0.25rem;
`;

export const MoreIcon = styled(MoreSVG)`
  height: 1.25rem;
  width: 1.25rem;
  fill: white;
  margin-right: 2rem;
  cursor: pointer;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.span`
  font-size: 1.3rem;
  font-weight: bold;
  margin-left: 2rem;
  margin-right: 0.5rem;
  color: white;
`;

export const Badge = styled.div`
  border-radius: 6.25rem;
  background: #f2cc00;
  width: 4.1875rem;
  height: 1.8125rem;
  color: #000;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.button`
  background-color: black;
  color: white;
  font-size: 0.9rem;
  border: none;
  cursor: pointer;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const Line = styled.div`
  width: 100%;
  height: 0.5px;
  background: rgba(225, 225, 225, 0.4);
  margin: 5px 0;
`;
