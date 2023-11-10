import styled from 'styled-components';

interface MessageProps {
  $isCurrentUser: boolean;
}

export const GryffindorContainer = styled.div`
  background-color: white;
  height: 100vh;
  overflow: auto;
`;

export const MessageWrapper = styled.div<MessageProps>`
  margin-bottom: 8px;
  text-align: ${(props) => (props.$isCurrentUser ? 'right' : 'left')};
  margin-left: ${(props) => (props.$isCurrentUser ? 'auto' : '0')};
`;
