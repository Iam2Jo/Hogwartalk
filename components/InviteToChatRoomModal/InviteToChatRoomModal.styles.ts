import styled from 'styled-components';
import InviteSVG from '@assets/img/Invite.svg';
import InviteAllSVG from '@assets/img/InviteAll.svg';

export const InviteIcon = styled(InviteSVG)`
  fill: var(--color-white);
  width: 25px;
  height: 25px;
  cursor: pointer;
  margin-left: 20px;
`;

export const InviteAllIcon = styled(InviteAllSVG)`
  fill: var(--color-white);
  width: 25px;
  height: 25px;
  cursor: pointer;
  margin-left: 20px;
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

export const ModalContainer = styled.div`
  background: var(--color-main-black);
  color: var(--color-white);
  padding: 50px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 800px;
  max-height: 600px;
  position: relative;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #666;
    border-radius: 12px;
  }
`;

export const ModalHeader = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const ModalContent = styled.div`
  margin-bottom: 20px;
`;

export const ModalLabel = styled.span`
  font-weight: bold;
  margin-bottom: 10px;
`;

export const ParticipantsWrapper = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
  max-height: 400px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #666;
    border-radius: 12px;
  }
`;

export const ParticipantsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

export const TitleInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 8px;
  color: #000;
  width: 90%;
  margin-right: 20px;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

export const CloseButton = styled.button`
  background: none;
  color: var(--color-white);
  border: none;
  padding: 10px;
  font-size: 20px;
  cursor: pointer;
  position: absolute;
  top: 50px;
  right: 50px;
  display: flex;
  align-items: center;
`;

export const CancelButton = styled.button`
  background: none;
  color: var(--color-white);
  border: none;
  padding: 10px;
  font-size: 15px;
  cursor: pointer;
  position: absolute;
  display: flex;
  align-items: center;
  margin-left: 80px;
`;

export const InvitedUsersWrapper = styled.div`
  margin-top: 20px;
`;

export const InvitedUsersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 16px;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;
