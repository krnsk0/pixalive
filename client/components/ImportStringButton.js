import React, { useContext } from 'react';
import { SocketContext, SpriteContext } from '../contexts';
const constants = require('../../shared/constants');

const ImportStringButton = () => {
  const sprite = useContext(SpriteContext);
  const socket = useContext(SocketContext);

  const onImportFromStringClick = () => {
    if (socket) {
      // eslint-disable-next-line no-alert
      const savedPixels = prompt('Paste pixel string', '');
      if (savedPixels) {
        const json = JSON.parse(atob(savedPixels));
        socket.emit(constants.MSG.UPLOAD_PIXELS, json);
      }
    }
  };

  return (
    <div className="navbar-button" onClick={onImportFromStringClick}>
      Import from String
    </div>
  );
};

export default ImportStringButton;
