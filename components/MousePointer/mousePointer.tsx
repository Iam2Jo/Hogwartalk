import React, { useState } from 'react';

const mousePointer = () => {
  const [xy, setXY] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    setXY({ x: mouseX, y: mouseY });
  };

  return (
    <div onMouseMove={handleMouseMove}>
      <div
        style={{
          position: 'absolute',
          left: xy.x,
          top: xy.y,
          color: 'white',
          zIndex: '999',
        }}
      >
        마우스따라이동
      </div>
    </div>
  );
};

export default mousePointer;
