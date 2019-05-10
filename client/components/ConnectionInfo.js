import React, { useContext } from 'react';
import { SocketContext, SpriteContext } from '../contexts';

const ConnectionInfo = () => {
  const socket = useContext(SocketContext);
  const sprite = useContext(SpriteContext);

  let socketId, namespace, userCount, userName;

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
    //Find current userName by socketId
    let currentUser = sprite.users.filter(user => user.socketId === socketId)
    userName = currentUser[0].name

  } else {
    userCount = '[loading]';
  }

  return (
    <div>
      <div>Your username is: {userName}</div>
      <div>The current socket namespace is: {namespace}</div>
      <div>Users in this namespace: {userCount}</div>
    </div>
  );
};

export default ConnectionInfo;
