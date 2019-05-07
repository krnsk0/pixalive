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

  const layers = sprite.frames[selectedFrame].layers;

  return (
    <div className="layer-container">
      <div className="layer-title-row">
        <div className="layer-title-text">Layers</div>
        <div className="layer-title-text link" onClick={null}>
          preview on
        </div>
      </div>
      <div className="layer-title-row">
        <div className="layer-button">➕</div>
        <div className="layer-button">️️➖</div>
        <div className="layer-button">✏️️</div>
        <div className="layer-button">⬇️</div>
        <div className="layer-button">⬆️</div>
      </div>
      {layers.map((layer, i) => (
        <div key={i} className="layer-row">
          {layer.name}
        </div>
      ))}
    </div>
  );
};

export default LayerPicker;
