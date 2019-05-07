import React, { useContext } from 'react';
import { SpriteContext, SocketContext } from '../contexts';

const LayerPicker = () => {
  const sprite = useContext(SpriteContext);
  const socket = useContext(SocketContext);

  // when the sprite exists and when there are users listed in the user object
  let selectedFrame = 0;
  if (socket && Object.keys(sprite.users).length) {
    const socketId = socket.id.slice(socket.nsp.length + 1);
    selectedFrame = sprite.users[socketId].selectedFrame;
  }

  return <div style={{ border: '1px solid black' }} />;
};

export default LayerPicker;
