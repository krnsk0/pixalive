import React, { useContext } from 'react';
import { SpriteContext, SocketContext } from '../contexts';
const constants = require('../../shared/constants');

const FramePicker = () => {
  const sprite = useContext(SpriteContext);
  const socket = useContext(SocketContext);
  const frames = sprite.frames;


  // get the selected frame from the sprite
  let selectedFrame = 0;
  if (socket) {
    const socketId = socket.id.slice(socket.nsp.length + 1);
    if (sprite.users[socketId]) {
      selectedFrame = sprite.users[socketId].selectedFrame;
    }
  }
  //slect new frame when click frame
  const onFrameClick = (frameOrder) => {
    if (socket){
      socket.emit(constants.MSG.UPDATE_SELECTED_FRAME, frameOrder)
    }
  }

  const onAddNewFrameClick = () => {
    if (socket){
      socket.emit(constants.MSG.ADD_NEW_FRAME)
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
          onClick={() => onFrameClick(frame.frameOrder) }
        >
          <canvas className="frame-canvas" />
        </div>
      ))}
      <div className="frame-container">
        <div
          className="add-new-frame"
          onClick={onAddNewFrameClick}
        >Add new frame</div>
      </div>
    </div>
  );
};

export default FramePicker;
