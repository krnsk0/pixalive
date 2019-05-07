import React, { useEffect, useState, useReducer } from 'react';
import io from 'socket.io-client';
import ColorPicker from './ColorPicker';
import { ConnectionInfo, SingleLayer, FramePicker, LayerPicker } from './';
import { SocketContext, SpriteContext } from '../contexts';
const constants = require('../../shared/constants');
const { initializeEmptySprite } = require('../../shared/factories');

const App = () => {
  // state for the socket
  const [socket, setSocket] = useState(false);

  // handle sprite reducer actions
  const spriteReducer = (state, action) => {
    if (action.type === constants.MSG.SEND_SPRITE) {
      return action.sprite;
    } else if (action.type === constants.MSG.CURSOR_UPDATE) {
      let newState = {
        ...state,
        users: {
          ...state.users,
          [action.socketId]: {
            ...state.users[action.socketId],
            x: action.x,
            y: action.y
          }
        }
      };
      return newState;
    }
  };

  // initialize sprite state to an empty sprite object
  const hash = window.location.pathname.slice(1);
  const initialSprite = initializeEmptySprite(
    hash,
    constants.NEW_SPRITE_WIDTH,
    constants.NEW_SPRITE_HEIGHT,
    true // this overrides the setting in constants file, never generating client-side fake data; fake data is server-side only
  );

  // set up reducer
  const [sprite, spriteDispatch] = useReducer(spriteReducer, initialSprite);

  // things that happen on component mount!
  useEffect(() => {
    // set up our websocket based on the URL's path component
    // eslint-disable-next-line no-shadow
    const socket = io(window.location.pathname);

    // pass up to state and then context provider when connected
    socket.on(constants.MSG.CONNECT, () => {
      setSocket(socket);
    });

    // when we get a sprite update from the server dispatch to sprite state
    socket.on(constants.MSG.SEND_SPRITE, newSprite => {
      spriteDispatch({ type: constants.MSG.SEND_SPRITE, sprite: newSprite });
    });

    // when we get a cursor update, dispatch to sprite state
    socket.on(constants.MSG.CURSOR_UPDATE, update => {
      spriteDispatch({ type: constants.MSG.CURSOR_UPDATE, ...update });
    });
  }, []);

  return (
    <div>
      <SocketContext.Provider value={socket}>
        <SpriteContext.Provider value={sprite}>
          <ConnectionInfo />
          <SingleLayer />
          <ColorPicker />
          <FramePicker />
          <LayerPicker />
        </SpriteContext.Provider>
      </SocketContext.Provider>
    </div>
  );
};

export default App;
