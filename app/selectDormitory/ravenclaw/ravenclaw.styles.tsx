import styled from 'styled-components';

interface MessageProps {
  $isCurrentUser: boolean;
}

export const DormitoryContainer = styled.div`
  background-color: white;
  width: 100vw;
  height: 100vh;
  overflow-y: hidden;
`;

export const MessageContainer = styled.div`
  background-color: #bebebe;
  width: 90%;
  height: 90%;
  overflow-y: auto;
`;

export const MessageWrapper = styled.div<MessageProps>`
  margin-bottom: 8px;
  text-align: ${(props) => (props.$isCurrentUser ? 'right' : 'left')};
  margin-left: ${(props) => (props.$isCurrentUser ? 'auto' : '0')};
`;

export const InputWrapper = styled.div`
  width: 100%;
  input {
    width: 80%;
  }
  button {
    width: 20%;
  }
`;
