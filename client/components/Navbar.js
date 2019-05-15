import React, { useState, useContext, useEffect } from 'react';
import { SocketContext, SpriteContext, PopupContext } from '../contexts';
const constants = require('../../shared/constants');
import { Link } from 'react-router-dom';
import { GoPencil, GoListUnordered } from 'react-icons/go';
import { IoIosUndo } from 'react-icons/io';

const Navbar = props => {
  const [name, setName] = useState('Untitled');
  const sprite = useContext(SpriteContext);
  const socket = useContext(SocketContext);
  const [popup, setPopup] = useContext(PopupContext);
  const [userName, setUserName] = useState('collaborator');

  let hashString =
    '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
  let hashVal;

  for (let i = 0; i < 10; i++) {
    hashVal = '';
    for (let j = 0; j < 12; j++) {
      hashVal += hashString[Math.floor(Math.random() * hashString.length)];
    }
  }

  // watch for changes to name
  useEffect(() => {
    if (socket) {
      if (sprite) {
        setName(sprite.name);
      }
    }
  }, [sprite]);

  //Watch the sprite object for changes and update the user name
  useEffect(() => {
    if (socket) {
      const socketId = socket.id.slice(socket.nsp.length + 1);
      if (sprite.users[socketId]) {
        setUserName(sprite.users[socketId].name);
      }
    }
  }, [sprite]);

  //Watch for changes in the user name field and send those to state
  const handleChange = event => {
    setUserName(event.target.value);
    if (socket) {
      socket.emit(constants.MSG.UPDATE_USERNAME, event.target.value);
    }
  };

  const onSpriteNameChange = evt => {
    setName(evt.target.value);
    socket.emit(constants.MSG.UPDATE_SPRITE_NAME, evt.target.value);
  };

  const onUndoClick = () => {
    if (socket) {
      socket.emit(constants.MSG.UNDO);
    }
  };

  return (
    <div className="top-section-container">
      <div className="top-left">
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
          <img className="app-title" src="/logo.png" />
        </Link>
      </div>
      <div className="top-middle">
        <div className="navbar-title-block">
          <input
            className="top-input-box input-title"
            type="text"
            name="sprite-name"
            value={name}
            onChange={onSpriteNameChange}
          />

          <div className="top-input-box-label">
            <GoPencil className="input-box-pencil-icon" size={10} />
            Sprite Title
          </div>
        </div>
        <div className="navbar-title-block">
          <input
            className="top-input-box input-username"
            name="name"
            type="text"
            onChange={handleChange}
            value={userName}
          />

          <div className="top-input-box-label">
            <GoPencil className="input-box-pencil-icon" size={10} />
            Display Name
          </div>
        </div>
        <div className="top-button" onClick={onUndoClick}>
          <IoIosUndo className="undo-icon" size={25} />
        </div>
      </div>
      <div className="top-right">
        <Link to={`/${hashVal}`} style={{ textDecoration: 'none' }}>
          <div className="top-button">New Sprite</div>
        </Link>
        <div className="top-button" onClick={() => setPopup(true)}>
          Import/Export
        </div>
      </div>
    </div>
  );
};

export default Navbar;
