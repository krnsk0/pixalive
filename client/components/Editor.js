import React, { useEffect, useState, useReducer } from 'react';
import io from 'socket.io-client';
import {
  ConnectionInfo,
  StyleEditorPage,
  FramePicker,
  ExportStringButton,
  ImportStringButton,
  Navbar,
  GifExportButton,
  ImportExportPopup
} from './';
import { SocketContext, SpriteContext, PopupContext } from '../contexts';
const constants = require('../../shared/constants');
const { initializeEmptySprite } = require('../../shared/factories');

const Editor = props => {
  // state for the socket
  const [socket, setSocket] = useState(false);

  // popup state
  const [popup, setPopup] = useState(false);

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
    } else if (action.type === constants.MSG.SELECTED_COLOR_UPDATE) {
      let newState = {
        ...state,
        users: {
          ...state.users,
          [action.socketId]: {
            ...state.users[action.socketId],
            selectedColor: action.selectedColor
          }
        }
      };
      return newState;
    } else if (action.type === constants.MSG.SELECTED_TOOL_UPDATE) {
      let newState = {
        ...state,
        users: {
          ...state.users,
          [action.socketId]: {
            ...state.users[action.socketId],
            selectedTool: action.selectedTool
          }
        }
      };
      return newState;
    } else if (action.type === constants.MSG.SEND_CHANGE_LIST) {
      // shallow copy so we can loop over a var hre
      let newState = {
        ...state
      };
      action.changeList.forEach(c => {
        newState = {
          ...newState,
          frames: newState.frames.map((frame, frameIdx) => {
            if (frameIdx !== c.frameIdx) return frame;
            else {
              frame.layers = frame.layers.map((layer, layerIdx) => {
                if (layerIdx !== c.layerIdx) return layer;
                else {
                  layer.pixels = layer.pixels.map((row, rowIdx) => {
                    if (rowIdx !== c.y) return row;
                    else {
                      row = row.map((cell, cellIdx) => {
                        if (cellIdx !== c.x) return cell;
                        else return c.color;
                      });
                      return row;
                    }
                  });
                  return layer;
                }
              });
              return frame;
            }
          })
        };
      });
      return newState;
    } else if (action.type === constants.MSG.SEND_USERNAME) {
      let newState = {
        ...state,
        users: {
          ...state.users,
          [action.socketId]: {
            ...state.users[action.socketId],
            name: action.updatedUserName
          }
        }
      };
      return newState;
    } else if (action.type === constants.MSG.SEND_SPRITE_NAME) {
      let newState = {
        ...state,
        name: action.name
      };
      return newState;
    }
  };

  // initialize sprite state to an empty sprite object
  const hash = props.location.pathname.slice(1);

  const initialSprite = initializeEmptySprite(
    hash,
    constants.NEW_SPRITE_WIDTH,
    constants.NEW_SPRITE_HEIGHT
  );

  // set up reducer
  const [sprite, spriteDispatch] = useReducer(spriteReducer, initialSprite);

  // things that happen on component mount
  useEffect(() => {
    // set up our websocket based on the URL's path component
    // eslint-disable-next-line no-shadow
    // const socket = io(window.location.pathname);
    const socket = io(props.location.pathname);
    // pass up to state and then context provider when connected
    socket.on(constants.MSG.CONNECT, () => {
      setSocket(socket);
    });

    // on disconnect, unmount
    socket.on(constants.MSG.DISCONNECT, () => {
      setSocket(false);
    });

    // when we get a sprite update from the server dispatch to sprite state
    socket.on(constants.MSG.SEND_SPRITE, newSprite => {
      spriteDispatch({ type: constants.MSG.SEND_SPRITE, sprite: newSprite });
    });

    // when we update color in the server dispatch to sprite state
    socket.on(constants.MSG.SELECTED_COLOR_UPDATE, selectedColor => {
      spriteDispatch({
        type: constants.MSG.SELECTED_COLOR_UPDATE,
        ...selectedColor
      });
    });

    //when we update selected tool in the server dispatch to sprite state
    socket.on(constants.MSG.SELECTED_TOOL_UPDATE, selectedTool => {
      spriteDispatch({
        type: constants.MSG.SELECTED_TOOL_UPDATE,
        ...selectedTool
      });
    });

    // when we get a cursor update, dispatch to sprite state
    socket.on(constants.MSG.CURSOR_UPDATE, update => {
      spriteDispatch({ type: constants.MSG.CURSOR_UPDATE, ...update });
    });

    // when we get a changelist update, dispatch to sprite state
    socket.on(constants.MSG.SEND_CHANGE_LIST, changeList => {
      spriteDispatch({ type: constants.MSG.SEND_CHANGE_LIST, changeList });
    });

    //when we update user name in the server dispatch to sprite state
    socket.on(constants.MSG.SEND_USERNAME, name => {
      spriteDispatch({
        type: constants.MSG.SEND_USERNAME,
        ...name
      });
    });

    // when we get a name update, dispatch to sprite state
    socket.on(constants.MSG.SEND_SPRITE_NAME, name => {
      spriteDispatch({ type: constants.MSG.SEND_SPRITE_NAME, ...name });
    });
  }, []);

  return (
    <div className="app-container">
      <SocketContext.Provider value={socket}>
        <SpriteContext.Provider value={sprite}>
          <PopupContext.Provider value={[popup, setPopup]}>
            {popup && <ImportExportPopup />}
            <Navbar />
            <StyleEditorPage />
            <FramePicker />
            <ConnectionInfo />
          </PopupContext.Provider>
        </SpriteContext.Provider>
      </SocketContext.Provider>
    </div>
  );
};

export default Editor;
