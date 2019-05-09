/* eslint-disable complexity */
import React, { useContext } from 'react';
import { SpriteContext, SocketContext } from '../contexts';
const constants = require('../../shared/constants');

const LayerPicker = () => {
  const sprite = useContext(SpriteContext);
  const socket = useContext(SocketContext);

  // get the selected frame
  let selectedFrame = 0;
  if (socket && Object.keys(sprite.users).length) {
    const socketId = socket.id.slice(socket.nsp.length + 1);
    if (sprite.users[socketId]) {
      selectedFrame = sprite.users[socketId].selectedFrame;
    }
  }

  // get the layers array
  let layers;
  if (sprite.frames[selectedFrame]) {
    layers = sprite.frames[selectedFrame].layers;
  }

  // get the selected layer
  let selectedLayer = 0;
  if (socket) {
    const socketId = socket.id.slice(socket.nsp.length + 1);
    if (sprite.users[socketId]) {
      selectedLayer = sprite.users[socketId].selectedLayer;
    }
  }

  // get the value of preview
  let preview = true;
  if (socket && Object.keys(sprite.users).length) {
    const socketId = socket.id.slice(socket.nsp.length + 1);
    if (sprite.users[socketId]) {
      preview = sprite.users[socketId].preview;
    }
  }

  // click handler for selecting layers
  const onSelectLayerClick = layerOrder => {
    if (socket) {
      socket.emit(constants.MSG.SELECT_LAYER, layerOrder);
    }
  };

  // click handler for adding new layers
  const onAddNewLayerClick = () => {
    if (socket) {
      socket.emit(constants.MSG.ADD_NEW_LAYER);
    }
  };

  const onDeleteLayerClick = () => {
    if (socket) {
      socket.emit(constants.MSG.DELETE_SELECTED_LAYER);
    }
  };

  const onLayerNameEditClick = () => {
    if (socket) {
      socket.emit(constants.MSG.EDIT_SELECTED_LAYER_NAME);
    }
  };

  const onLayerMoveUpClick = () => {
    socket.emit(constants.MSG.MOVE_SELECTED_LAYER_UP);
  };

  const onLayerMoveDownClick = () => {
    socket.emit(constants.MSG.MOVE_SELECTED_LAYER_DOWN);
  };

  // click handler for toggling preview
  const onPreviewToggleClick = evt => {
    evt.preventDefault();
    if (evt.target.checked && socket) {
      socket.emit(constants.MSG.SET_PREVIEW_LAYER, true);
    } else if (!evt.target.checked && socket) {
      socket.emit(constants.MSG.SET_PREVIEW_LAYER, false);
    }
  };

  return (
    <div className="layer-container">
      <div className="layer-title-row">
        <div className="layer-title-text">Layers</div>
        <div className="layer-title-text">
          Preview:{' '}
          <input
            type="checkbox"
            name="preview"
            onChange={onPreviewToggleClick}
            checked={preview}
            className="layer-picker-checkbox"
          />
        </div>
      </div>
      <div className="layer-title-row">
        <div className="layer-button" onClick={onAddNewLayerClick}>
          ➕
        </div>
        <div className="layer-button" onClick={onAddNewLayerClick}>
          ️️➖
        </div>
        <div className="layer-button" onClick={onDeleteLayerClick}>
          ✏️️
        </div>
        <div className="layer-button" onClick={onLayerMoveDownClick}>
          ⬇️
        </div>
        <div className="layer-button" onClick={onLayerMoveUpClick}>
          ⬆️
        </div>
      </div>
      {layers.map(layer => (
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
