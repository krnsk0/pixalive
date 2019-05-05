import React, { useEffect, useState } from 'react';

const ConnectionInfo = props => {
  const { socket, sprite } = props;

  // state to store the socket id
  const [socketId, setSocketId] = useState('[loading]');

  // when socket changes, try to get the id
  useEffect(() => {
    const socketId = socket.id
      ? socket.id.slice(socket.nsp.length + 1)
      : '[loading]';
    setSocketId(socketId);
  }, [sprite]);

  // try to get the namespce and usercount from sprite
  const namespace = sprite.hash || '[loading]';
  const userCount = sprite.users
    ? Object.keys(sprite.users).length
    : '[loading]';

  return (
    <div>
      <div>This client's socket id is: {socketId}</div>
      <div>The current socket namespace is: {namespace}</div>
      <div>Users in this namespace: {userCount}</div>
    </div>
  );
};

export default ConnectionInfo;
