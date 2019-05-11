import React, { useContext } from 'react';
import { SpriteContext, SocketContext } from '../contexts';
const constants = require('../../shared/constants');
import { SmallCanvas } from './';


const FramePicker = () => {
  const sprite = useContext(SpriteContext);
  const socket = useContext(SocketContext);
  const frames = sprite.frames;
  const canvasWidth = 80;
  const canvasHeight = 80;

  // get the selected frame from the sprite
  let selectedFrame = 0;
  if (socket) {
    const socketId = socket.id.slice(socket.nsp.length + 1);
    if (sprite.users[socketId]) {
      selectedFrame = sprite.users[socketId].selectedFrame;
    }
  }
  // click handler for frame clicks
  const onFrameClick = frameOrder => {
    if (socket) {
      socket.emit(constants.MSG.UPDATE_SELECTED_FRAME, frameOrder);
    }
  };

  // click handler for adding frames
  const onAddNewFrameClick = () => {
    if (socket) {
      socket.emit(constants.MSG.ADD_NEW_FRAME);
    }
  };

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
            onClick={() => onFrameClick(frame.frameOrder)}
          >
            <SmallCanvas
              canvasWidth={canvasWidth}
              canvasHeight={canvasHeight}
              layers={frame.layers}
            />
          </div>
        ))}
        <div className="frame-container">
          <div className="add-new-frame" onClick={onAddNewFrameClick}>
            <div className="add-new-frame-plus">➕</div>
          </div>
        </div>
      </div>
  );
};

export default FramePicker;
