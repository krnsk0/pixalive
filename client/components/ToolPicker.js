import React, { useContext } from 'react';
import { SpriteContext, SocketContext } from '../contexts';
const constants = require('../../shared/constants');
import { GoPaintcan, GoPencil } from 'react-icons/go';
import { FaEraser, FaEyeDropper } from 'react-icons/fa';

const ToolPicker = () => {
  const sprite = useContext(SpriteContext);
  const socket = useContext(SocketContext);

  // // get the selected tool
  let selectedTool = 'pen';
  if (socket && Object.keys(sprite.users).length) {
    const socketId = socket.id.slice(socket.nsp.length + 1);
    if (sprite.users[socketId]) {
      selectedTool = sprite.users[socketId].selectedTool;
    }
  }

  // click handler for selecting tool
  const onSelectToolClick = selectedTool => {
    if (socket) {
      socket.emit(constants.TOOLS.SELECT_TOOL, selectedTool);
    }
  };

  return (
    <div className="tool-container">
      <div
        className={
          selectedTool === constants.TOOLS.PEN
            ? 'tool-button selected'
            : 'tool-button'
        }
        onClick={() => onSelectToolClick(constants.TOOLS.PEN)}
      >
        {' '}
        <GoPencil className="tool-picker-icon" size={28} />
      </div>

      <div
        className={
          selectedTool === constants.TOOLS.PAINT_CAN
            ? 'tool-button selected'
            : 'tool-button'
        }
        onClick={() => onSelectToolClick(constants.TOOLS.PAINT_CAN)}
      >
        {' '}
        <GoPaintcan className="tool-picker-icon" size={28} />
      </div>

      <div
        className={
          selectedTool === constants.TOOLS.EYE_DROPPER
            ? 'tool-button selected'
            : 'tool-button'
        }
        onClick={() => onSelectToolClick(constants.TOOLS.EYE_DROPPER)}
      >
        {' '}
        <FaEyeDropper className="tool-picker-icon" size={28} />
      </div>

      <div
        className={
          selectedTool === constants.TOOLS.ERASER
            ? 'tool-button selected'
            : 'tool-button'
        }
        onClick={() => onSelectToolClick(constants.TOOLS.ERASER)}
      >
        {' '}
        <FaEraser className="tool-picker-icon" size={28} />
      </div>
    </div>
  );
};

export default ToolPicker;
