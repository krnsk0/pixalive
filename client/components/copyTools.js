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

  return <div className="copy-tools-container" />;
};

export default LayerTools;
