import React, { useState, useContext, useEffect } from 'react';
import { SocketContext, SpriteContext } from '../contexts';
const constants = require('../../shared/constants');

const NewSpriteSize = () => {
  const socket = useContext(SocketContext);
  const sprite = useContext(SpriteContext);


  const [spriteSize, setSpriteSize] = useState();

  const handleChange = evt => {
    setSpriteSize(evt.target.value)
    evt.preventDefault();
    if (socket) {
      socket.emit(constants.MSG.RESIZE_SPRITE, evt.target.value);
      socket.emit(constants.TOOLS.SELECT_TOOL, constants.TOOLS.PEN)
    }
  };

  return (
    <form>
      <select
        value={spriteSize}
        onChange={handleChange}
      >
        <option value={16}>16x16</option>
        <option value={32}>32x32</option>
        <option value={48}>48x48</option>
        <option value={64}>64x64</option>
      </select>
    </form>
  );
};

export default NewSpriteSize;
