import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { ConnectionInfo, SingleLayer } from './';
import { SocketContext, SpriteContext } from '../contexts';
const constants = require('../../shared/constants');

const App = () => {
  // state for the socket and the sprite
  const [socket, setSocket] = useState(false);
  const [sprite, setSprite] = useState(false);

  // things that happen on component mount!
  useEffect(() => {
    // set up our websocket based on the URL's path component
    // eslint-disable-next-line no-shadow
    const socket = io(window.location.pathname);

    // pass up to state and context provider when connected
    socket.on(constants.MSG.CONNECT, () => {
      setSocket(socket);
    });

    // when socket has problems
    socket.on(constants.MSG.DISCONNECT, reason => {
      setSocket(false);
    });

    // when we get a sprite update from the server...
    socket.on(constants.MSG.SEND_SPRITE, newSprite => {
      // store on state
      setSprite(newSprite);
    });
  }, []);

  return (
    <div>
      <SocketContext.Provider value={socket}>
        <SpriteContext.Provider value={sprite}>
          <ConnectionInfo />
          <SingleLayer />
        </SpriteContext.Provider>
      </SocketContext.Provider>
    </div>
  );
};

export default App;
