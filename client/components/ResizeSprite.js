import React, { useState, useContext } from 'react';
import { SocketContext } from '../contexts';
const constants = require('../../shared/constants');

const NewSpriteSize = () => {
  const socket = useContext(SocketContext);

  const [spriteSize, setSpriteSize] = useState(16);

  const handleSubmit = evt => {
    evt.preventDefault();
    if (socket) {
      socket.emit(constants.MSG.RESIZE_SPRITE, spriteSize);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        onChange={e => {
          setSpriteSize(e.target.value);
        }}
      >
        <option value={16}>16x16</option>
        <option value={32}>32x32</option>
        <option value={48}>48x48</option>
        <option value={64}>64x64</option>
      </select>
      <input type="submit" value="Resize sprite" />
    </form>
  );
};

export default NewSpriteSize;
