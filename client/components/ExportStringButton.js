import React, { useContext } from 'react';
import { SocketContext, SpriteContext } from '../contexts';
const constants = require('../../shared/constants');

const ExportStringButton = () => {
  const sprite = useContext(SpriteContext);
  const socket = useContext(SocketContext);

  const copyTextToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  const onExportToStringClick = () => {
    if (socket) {
      const jsonString = JSON.stringify(sprite.frames);
      const base64String = btoa(jsonString);
      copyTextToClipboard(base64String);
    }
  };

  return (
    <div className="navbar-button" onClick={onExportToStringClick}>
      Export String to Clipboard
    </div>
  );
};

export default ExportStringButton;
