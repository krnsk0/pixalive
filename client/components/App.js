import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { ConnectionInfo, SingleLayer, FramePicker, LayerPicker } from './';
import { SocketContext, SpriteContext } from '../contexts';
const constants = require('../../shared/constants');
const { initializeEmprySprite } = require('../../shared/factories');

const App = () => {
  // state for the socket
  const [socket, setSocket] = useState(false);

  // initialize sprite state to an empty sprite object
  const hash = window.location.pathname.slice(1);
  const [sprite, setSprite] = useState(
    initializeEmprySprite(
      hash,
      constants.NEW_SPRITE_WIDTH,
      constants.NEW_SPRITE_HEIGHT
    )
  );

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
    socket.on(constants.MSG.DISCONNECT, () => {
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
          <FramePicker />
          <LayerPicker />
        </SpriteContext.Provider>
      </SocketContext.Provider>
    </div>
  );
};

export default App;
