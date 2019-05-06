import React, { useContext } from 'react';
import { SocketContext, SpriteContext } from '../contexts';

const ConnectionInfo = () => {
  const socket = useContext(SocketContext);
  const sprite = useContext(SpriteContext);

  let socketId, namespace, userCount;

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
    <div>
      <div>This client's socket id is: {socketId}</div>
      <div>The current socket namespace is: {namespace}</div>
      <div>Users in this namespace: {userCount}</div>
    </div>
  );
};

export default ConnectionInfo;
