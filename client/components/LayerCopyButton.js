/* eslint-disable max-statements */
/* eslint-disable complexity */
import React, { useContext } from 'react';
import { SocketContext } from '../contexts';
import { GoClippy } from 'react-icons/go';

const constants = require('../../shared/constants');

const LayerCopyButton = () => {
  const socket = useContext(SocketContext);

  const onCopyLayerClick = () => {
    if (socket) {
      socket.emit(constants.MSG.COPY_LAYER);
    }
  };

  return (
    <div className="layer-copy-button" onClick={onCopyLayerClick}>
      <GoClippy className="layer-copy-icon" size={40} />
      <span className="layer-copy-text">Copy selected layer to all frames</span>
    </div>
  );
};

export default LayerCopyButton;
