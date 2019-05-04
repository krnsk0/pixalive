import React, { useEffect, useState } from 'react';
const constants = require('../../shared/constants');

const ConnectionDebugger = props => {
  const { socket } = props;

  // state for the socket id so we can display it
  // state for the current namespace so we can display it
  // state for the number of connected users
  const [socketId, setSocketId] = useState('[loading]');
  const [namespace, setNamespace] = useState('[loading]');
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    // store our socket id and namespace on connect
    socket.on(constants.MSG.CONNECT, () => {
      const id = socket.id.slice(socket.nsp.length + 1);
      console.log('connection id:', id);
      setSocketId(id);
      console.log('namespace', socket.nsp);
      setNamespace(socket.nsp);
    });

    // store current connected user count when the server updates
    socket.on(constants.MSG.SEND_SPRITE, sprite => {
      setUserCount(Object.keys(sprite.users).length);
    });
  }, []);

  return (
    <div>
      <div>This client's socket id is {socketId}</div>
      <div>The current socket namespace is {namespace}</div>
      <div>Users in this namespace: {userCount}</div>
    </div>
  );
};

export default ConnectionDebugger;
