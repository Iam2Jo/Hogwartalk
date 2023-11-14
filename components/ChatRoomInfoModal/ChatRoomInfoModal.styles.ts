import styled from 'styled-components';
import EditSVG from '@assets/img/Edit.svg';
import SaveSVG from '@assets/img/Save.svg';

export const EditIcon = styled(EditSVG)`
  fill: var(--color-white);
  width: 25px;
  height: 25px;
  cursor: pointer;
`;

export const SaveIcon = styled(SaveSVG)`
  fill: var(--color-white);
  width: 25px;
  height: 25px;
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

export const ModalContainer = styled.div`
  background: var(--color-main-black);
  color: var(--color-white);
  padding: 50px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 800px;
  height: 600px;
  position: relative;
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

export const CloseIcon = styled.span`
  font-size: 24px;
`;

export const ModalHeader = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const ModalContent = styled.div`
  margin-bottom: 20px;
`;

export const TopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
`;

export const MiddleWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  margin-bottom: 20px;
`;

export const ModalLabel = styled.span`
  font-weight: bold;
  margin-bottom: 10px;
`;

export const ModalValue = styled.span`
  color: var(--color-white);
`;

export const ModalParticipants = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0;
`;

export const ParticipantsWrapper = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
  max-height: 200px;
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
