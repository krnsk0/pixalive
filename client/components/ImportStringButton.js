import React, { useContext } from 'react';
import { SocketContext, SpriteContext, PopupContext } from '../contexts';
const constants = require('../../shared/constants');

const ImportStringButton = () => {
  const sprite = useContext(SpriteContext);
  const socket = useContext(SocketContext);
  const [popup, setPopup] = useContext(PopupContext);

  const onImportFromStringClick = () => {
    if (socket) {
      // eslint-disable-next-line no-alert
      const savedPixels = prompt('Paste pixel string', '');
      if (savedPixels) {
        const json = JSON.parse(atob(savedPixels));
        socket.emit(constants.MSG.UPLOAD_PIXELS, json);
        setPopup(false);
      }
    }
  };

  return (
    <div className="popup-button" onClick={onImportFromStringClick}>
      Import from String
    </div>
  );
};

export default ImportStringButton;
