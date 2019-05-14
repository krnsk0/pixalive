/* eslint-disable max-statements */
/* eslint-disable complexity */
import React, { useContext } from 'react';
import { SocketContext } from '../contexts';
import { GoClippy, GoDiffAdded, GoCode, GoChevronRight } from 'react-icons/go';

const constants = require('../../shared/constants');

const CopyTools = () => {
  const socket = useContext(SocketContext);

  const onCopyLayerClick = () => {
    if (socket) {
      socket.emit(constants.MSG.COPY_LAYER);
    }
  };

  const onCopyLayerToOneFrameClick = () => {
    if (socket) {
      socket.emit(constants.MSG.COPY_LAYER_TO_ONE_FRAME);
    }
  };

  // click handler for adding frames
  const onAddNewFrameClick = () => {
    if (socket) {
      socket.emit(constants.MSG.ADD_NEW_FRAME);
    }
  };

  // click handler for cloning frames
  const onDuplicatedSelectedFrameClick = () => {
    if (socket) {
      socket.emit(constants.MSG.DUPLICATE_SELECTED_FRAME);
    }
  };

  return (
    <div className="copy-tools-container">
      <div
        className="copy-tools-button"
        onClick={onDuplicatedSelectedFrameClick}
      >
        <GoClippy className="copy-tools-icon" size={30} />
        <span className="copy-tools-text">Duplicate selected frame</span>
      </div>

      <div className="copy-tools-button" onClick={onAddNewFrameClick}>
        <GoDiffAdded className="copy-tools-icon" size={30} />
        <span className="copy-tools-text">Add new frame</span>
      </div>

      <div className="copy-tools-button" onClick={onCopyLayerClick}>
        <GoCode className="copy-tools-icon" size={30} />
        <span className="copy-tools-text">
          Copy selected layer to all frames
        </span>
      </div>

      <div className="copy-tools-button" onClick={onCopyLayerToOneFrameClick}>
        <GoChevronRight className="copy-tools-icon" size={30} />
        <span className="copy-tools-text">
          Copy selected layer to next frame
        </span>
      </div>
    </div>
  );
};

export default CopyTools;
