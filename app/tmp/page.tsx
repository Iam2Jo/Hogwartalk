'use client';

import React, { useState } from 'react';
import ChatRoomInfoModal from '@/components/ChatRoomInfoModal/ChatRoomInfoModal';

const tmp = () => {
  const data = {
    title: '책읽기 모임',
    maxParticipants: 20,
    host: 'John Doe',
    creationDate: '2023-11-10',
    participants: [
      { id: 1, name: 'Harry Potter' },
      { id: 2, name: 'Hermione Granger' },
      { id: 3, name: 'Ron Weasley' },
      { id: 4, name: 'Albus Dumbledore' },
      { id: 5, name: 'Severus Snape' },
      { id: 6, name: 'Sirius Black' },
      { id: 7, name: 'Luna Lovegood' },
      { id: 8, name: 'Ginny Weasley' },
      { id: 9, name: 'Draco Malfoy' },
    ],
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>채팅방 정보 보기</button>

      <ChatRoomInfoModal
        title={data.title}
        maxParticipants={data.maxParticipants}
        host={data.host}
        creationDate={data.creationDate}
        participants={data.participants}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default tmp;
