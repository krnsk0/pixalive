/* eslint-disable complexity */
import React, { useContext } from 'react';
import { SpriteContext, SocketContext } from '../contexts';
const constants = require('../../shared/constants');
import { GoPaintcan, GoPencil } from 'react-icons/go';
import { FaEraser, FaEyeDropper, FaPaintBrush } from 'react-icons/fa';

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

  let brush;

  if (sprite.frames[0].layers[0].pixels.length === 16) {
    brush = constants.TOOLS.BRUSH_16;
  }
  if (sprite.frames[0].layers[0].pixels.length === 32) {
    brush = constants.TOOLS.BRUSH_32;
  }
  if (sprite.frames[0].layers[0].pixels.length === 48) {
    brush = constants.TOOLS.BRUSH_48;
  }
  if (sprite.frames[0].layers[0].pixels.length === 64) {
    brush = constants.TOOLS.BRUSH_64;
  }

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
        <GoPencil className="tool-picker-icon" size={25} />
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
        <GoPaintcan className="tool-picker-icon" size={25} />
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
        <FaEyeDropper className="tool-picker-icon" size={25} />
      </div>
      <div
        className={
          selectedTool === brush ? 'tool-button selected' : 'tool-button'
        }
        onClick={() => onSelectToolClick(brush)}
      >
        {' '}
        <FaPaintBrush className="tool-picker-icon" size={25} />
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
        <FaEraser className="tool-picker-icon" size={25} />
      </div>
    </div>
  );
};

export default ToolPicker;
