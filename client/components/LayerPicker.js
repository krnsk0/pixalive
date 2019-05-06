import React, { useContext } from 'react';
import { SpriteContext, SocketContext } from '../contexts';

const LayerPicker = () => {
  const sprite = useContext(SpriteContext);
  const socket = useContext(SocketContext);

  // sprite.users not immediately available
  // socket.id not immediately available
  let selectedFrame = 0;
  if (socket && sprite.users.length) {
    const socketId = socket.id.slice(socket.nsp.length + 1);
    selectedFrame = sprite.users[socketId].selectedFrame;
    console.log('selectedFrame: ', selectedFrame);
  }

  const layers = sprite.frames[selectedFrame].layers;

  return (
    <div style={{ border: '1px solid black' }}>
      layers for frame {selectedFrame}:
      {layers.map((layer, i) => (
        <div key={i}>layer {i}</div>
      ))}
    </div>
  );
};

export default LayerPicker;
