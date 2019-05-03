import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const constants = require('../../shared/constants');

const App = () => {
  const [socketId, setSocketId] = useState('');

  useEffect(() => {
    const socket = io();
    socket.on(constants.MSG.CONNECT, () => {
      console.log('connection id:', socket.id);
      setSocketId(socket.id);
    });
  }, []);

  return (
    <div>
      Hello world from the app component! This client's socket id is {socketId}{' '}
    </div>
  );
};

export default App;
