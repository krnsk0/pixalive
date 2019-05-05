import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { ConnectionInfo, SingleLayer } from './';
const constants = require('../../shared/constants');

const App = () => {
  // state for the socket and the sprite
  const [socket, setSocket] = useState(false);
  const [sprite, setSprite] = useState(false);

  // things that happen on component mount!
  useEffect(() => {
    // set up our websocket based on the URL's path component
    const socket = io(window.location.pathname);
    setSocket(socket);

    // when we get a sprite update from the server...
    socket.on(constants.MSG.SEND_SPRITE, newSprite => {
      // store on state
      setSprite(newSprite);
    });
  }, []);

  return (
    <div>
      <ConnectionInfo socket={socket} sprite={sprite} />
      <SingleLayer socket={socket} sprite={sprite} />
    </div>
  );
};

export default App;
