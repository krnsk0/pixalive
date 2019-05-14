/* eslint-disable max-statements */
/* eslint-disable complexity */
import React, { useContext } from 'react';
import { SocketContext } from '../contexts';
import {
  GoArrowDown,
  GoArrowLeft,
  GoArrowRight,
  GoArrowUp
} from 'react-icons/go';
import { MdRotate90DegreesCcw } from 'react-icons/md';
const constants = require('../../shared/constants');

const LayerTools = () => {
  const socket = useContext(SocketContext);

  const onLayerTranslateClick = dir => {
    if (socket) {
      socket.emit(constants.MSG.TRANSLATE_SELECTED_LAYER, dir);
    }
  };

  return (
    <div className="layer-translation-container">
      <div className="layer-title-row">
        <div className="layer-title-text">Layer Translation</div>
      </div>
      <div className="layer-tool-container">
        <div
          className="layer-tool-button"
          onClick={() => onLayerTranslateClick('left')}
        >
          <GoArrowLeft className="layer-tool-icon" size={32} />
        </div>
        <div
          className="layer-tool-button"
          onClick={() => onLayerTranslateClick('right')}
        >
          <GoArrowRight className="layer-tool-icon" size={32} />
        </div>
        <div
          className="layer-tool-button"
          onClick={() => {
            onLayerTranslateClick('rotate');
          }}
        >
          <MdRotate90DegreesCcw className="layer-tool-icon" size={28} />
        </div>
        <div
          className="layer-tool-button"
          onClick={() => onLayerTranslateClick('down')}
        >
          <GoArrowDown className="layer-tool-icon" size={32} />
        </div>
        <div
          className="layer-tool-button"
          onClick={() => onLayerTranslateClick('up')}
        >
          <GoArrowUp className="layer-tool-icon" size={32} />
        </div>
      </div>
    </div>
  );
};

export default LayerTools;
