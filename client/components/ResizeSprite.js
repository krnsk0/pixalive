import React, { useState, useContext, useEffect } from 'react';
import { SocketContext, SpriteContext } from '../contexts';
const constants = require('../../shared/constants');

const NewSpriteSize = () => {
  const socket = useContext(SocketContext);
  const sprite = useContext(SpriteContext);
  const [spriteSize, setSpriteSize] = useState();

  useEffect(() => {
    if (sprite) {
      setSpriteSize(sprite.frames[0].layers[0].pixels.length);
    }
  }, [sprite]);

  const handleSubmit = evt => {
    evt.preventDefault();
    if (socket) {
      socket.emit(constants.MSG.RESIZE_SPRITE, spriteSize);
    }
  };

  return (
    <div className="resize-picker-container">
      <form onSubmit={handleSubmit}>
        <select
          className="resize-selector"
          value={spriteSize}
          onChange={e => {
            setSpriteSize(e.target.value);
          }}
        >
          <option value={16}>16x16</option>
          <option value={32}>32x32</option>
          <option value={48}>48x48</option>
          <option value={64}>64x64</option>
        </select>
        <input
          type="submit"
          value="Resize sprite"
          className="resize-sprite-button"
        />
      </form>
    </div>
  );
};

export default NewSpriteSize;
