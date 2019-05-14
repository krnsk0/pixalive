import React, { useContext, useState, useEffect } from 'react';
import { SocketContext, SpriteContext } from '../contexts';
const constants = require('../../shared/constants');

const ConnectionInfo = () => {
  const socket = useContext(SocketContext);
  const sprite = useContext(SpriteContext);

  let socketId, namespace, userCount;
  //Do we still need this?
  // if the socket is connected, get the id and namespace
  if (socket) {
    socketId = socket.id.slice(socket.nsp.length + 1);
    namespace = socket.nsp;
  } else {
    socketId = '[loading]';
    namespace = '[loading]';
  }
  // if the sprite has loaded, save the # of users
  if (sprite) {
    userCount = Object.keys(sprite.users).length;
  } else {
    userCount = '[loading]';
  }

  return (
    <div className="info">
      <div>The current socket namespace is: {namespace}</div>
      <div>Users in this namespace: {userCount}</div>
    </div>
  );
};

export default ConnectionInfo;
