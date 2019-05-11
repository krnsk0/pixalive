import React, { useContext } from 'react';
import { SpriteContext, SocketContext } from '../contexts';
const constants = require('../../shared/constants');
import { SmallCanvas } from './';
import { GoTrashcan, GoTriangleLeft, GoTriangleRight } from 'react-icons/go';

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

  // click handler for shifting frames left
  const onShiftFrameLeftClick = frameOrder => {
    if (socket) {
      socket.emit(constants.MSG.SHIFT_FRAME_LEFT, frameOrder);
    }
  };

  // click handler for shifting frames right
  const onShiftFrameRightClick = frameOrder => {
    if (socket) {
      socket.emit(constants.MSG.SHIFT_FRAME_RIGHT, frameOrder);
    }
  };

  // click handler for shifting frames right
  const onDeleteFrameClick = frameOrder => {
    if (socket) {
      socket.emit(constants.MSG.DELETE_FRAME, frameOrder);
    }
  };

  const onDuplicatedSelectedFrameClick = () => {
    if (socket) {
      socket.emit(constants.MSG.DUPLICATE_SELECTED_FRAME);
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
        >
          <div onClick={() => onFrameClick(frame.frameOrder)}>
            <SmallCanvas
              canvasWidth={canvasWidth}
              canvasHeight={canvasHeight}
              layers={frame.layers}
            />
          </div>
          <div className="frame-button-container">
            <div
              className="frame-button"
              onClick={() => onShiftFrameLeftClick(frame.frameOrder)}
            >
              <GoTriangleLeft className="frame-button-icon " size={16} />
            </div>
            <div
              className="frame-button"
              onClick={() => onDeleteFrameClick(frame.frameOrder)}
            >
              <GoTrashcan className="frame-button-icon " size={16} />
            </div>
            <div
              className="frame-button"
              onClick={() => onShiftFrameRightClick(frame.frameOrder)}
            >
              <GoTriangleRight className="frame-button-icon " size={16} />
            </div>
          </div>
        </div>
      ))}
      <div className="frame-container">
        <div className="add-new-frame">
          {frames.length <= constants.FRAME_CAP ? (
            <div>
              <div
                className="add-new-frame-button"
                onClick={onAddNewFrameClick}
              >
                New blank frame
              </div>
              <div
                className="add-new-frame-button"
                onClick={onDuplicatedSelectedFrameClick}
              >
                Duplicate Selected Frame
              </div>
            </div>
          ) : (
            <div className="frame-cap-message">Frame cap reached</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FramePicker;
