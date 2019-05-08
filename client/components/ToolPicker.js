import React, { useContext } from 'react';
import { SpriteContext, SocketContext } from '../contexts';
const constants = require('../../shared/constants');
import { GoPaintcan, GoPencil } from 'react-icons/go'
import { FaEraser, FaEyeDropper } from 'react-icons/fa'

const ToolPicker = () => {
    const sprite = useContext(SpriteContext);
    const socket = useContext(SocketContext);

    // // get the selected tool
    let selectedTool = 'pen'
    if (socket && Object.keys(sprite.users).length) {
      const socketId = socket.id.slice(socket.nsp.length + 1);
      selectedTool = sprite.users[socketId].selectedTool;
    }


    // click handler for selecting tool
    const onSelectToolClick = (selectedTool) => {
      if (socket) {
        socket.emit(constants.MSG.SELECT_TOOL, selectedTool);
      }
    };

    return (
        <div className="tool-container">
            <div
            className={
            selectedTool === 'pen'
              ? 'tool-button selected'
              : 'tool-button'}
                onClick={() => onSelectToolClick('pen')}
            > <GoPencil className="tool-picker-icon" size={28} />
            </div>

            <div
            className={
            selectedTool === 'paint-can'
              ? 'tool-button selected'
              : 'tool-button'}
                onClick={() => onSelectToolClick('paint-can')}
            > <GoPaintcan className="tool-picker-icon" size={28}  />
            </div>

            <div
            className={
            selectedTool === 'eyedropper'
              ? 'tool-button selected'
              : 'tool-button'}
                onClick={() => onSelectToolClick('eyedropper')}
            > <FaEyeDropper className="tool-picker-icon" size={28} />
            </div>

            <div
            className={
            selectedTool === 'eraser'
              ? 'tool-button selected'
              : 'tool-button'}
                onClick={() => onSelectToolClick('eraser')}
            > <FaEraser className="tool-picker-icon" size={28} />
            </div>

        </div>
    );
  };

  export default ToolPicker;
