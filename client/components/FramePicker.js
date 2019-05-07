import React, { useContext } from 'react';
import { SpriteContext, SocketContext } from '../contexts';

const FramePicker = () => {
  const sprite = useContext(SpriteContext);
  const socket = useContext(SocketContext);
  const frames = sprite.frames;
  console.log('frames: ', frames);

  // get the selected frame from the sprite
  let selectedFrame = 0;
  if (socket) {
    const socketId = socket.id.slice(socket.nsp.length + 1);
    if (sprite.users[socketId]) {
      selectedFrame = sprite.users[socketId].selectedFrame;
    }
  }

  return (
    <div className="bottom-section-container">
      {frames.map(frame => (
        <div
          key={frame.frameOrder}
          className={
            frame.frameOrder === selectedFrame
              ? 'frame-container selected'
              : 'frame-container'
          }
        >
          <canvas className="frame-canvas" />
        </div>
      ))}
      <div className="frame-container">
        <div className="add-new-frame">Add new frame</div>
      </div>
    </div>
  );
};

export default FramePicker;
