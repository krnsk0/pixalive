import React, { useContext } from 'react';
import { SpriteContext, SocketContext } from '../contexts';
const constants = require('../../shared/constants');

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
  let selectedLayer = 0;

  if (socket) {
    const socketId = socket.id.slice(socket.nsp.length + 1);
    if (sprite.users[socketId]) {
      selectedLayer = sprite.users[socketId].selectedLayer;
    }
  }

  let preview = true;
  if (socket && Object.keys(sprite.users).length) {
    const socketId = socket.id.slice(socket.nsp.length + 1);
    preview = sprite.users[socketId].preview;
  }

  const onSelectLayerClick = (layerOrder) => {
    if (socket){
      socket.emit(constants.MSG.SELECT_LAYER, layerOrder )
    }
  }

  const onAddNewLayerClick = () => {
    if (socket){
      socket.emit(constants.MSG.ADD_NEW_LAYER)
    }
  }

  const onPreviewToggleClick = (evt) => {
    evt.preventDefault();
    if (evt.target.checked && socket) {
        socket.emit(constants.MSG.SET_PREVIEW_LAYER, true)
    }

    else if (!evt.target.checked && socket) {
        socket.emit(constants.MSG.SET_PREVIEW_LAYER, false)
    }
  }

  return (
    <div className="layer-container">
      <div className="layer-title-row">
        <div className="layer-title-text">Layers</div>
        <div className="layer-title-text link">
          preview:<input
            type="checkbox"
            name="preview"
            onChange={onPreviewToggleClick}
            checked={preview}
            />
        </div>
      </div>
      <div className="layer-title-row">
        <div
        className="layer-button"
        onClick={onAddNewLayerClick}>➕
        </div>
        <div className="layer-button">️️➖</div>
        <div className="layer-button">✏️️</div>
        <div className="layer-button">⬇️</div>
        <div className="layer-button">⬆️</div>
      </div>
      {layers.map((layer) => (
        <div
          key={layer.layerOrder}
          className={
          layer.layerOrder === selectedLayer
            ? 'layer-row selected'
            : 'layer-row'
        }
        onClick={() => onSelectLayerClick(layer.layerOrder)}
          >
          {layer.name}
        </div>
      ))}
    </div>
  );

};

export default LayerPicker;
