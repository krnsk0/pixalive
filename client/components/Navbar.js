import React, { useState, useContext, useEffect } from 'react';
import { SocketContext, SpriteContext } from '../contexts';
const constants = require('../../shared/constants');
import { Link } from 'react-router-dom';

const Navbar = props => {
  const [name, setName] = useState('Untitled');
  const sprite = useContext(SpriteContext);
  const socket = useContext(SocketContext);
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
    if (sprite) {
      if (socket) {
        const socketId = socket.id.slice(socket.nsp.length + 1);
        if (sprite.users[socketId]) {
          setUserName(sprite.users[socketId].name);
        }
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
  return (
    <div className="top-section-container">
      <div className="top-left">
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
          <img className="app-title" src="/logo.png" />
        </Link>
      </div>
      <div className="top-middle">
        <div className="sprite-title">
          <input
            className="top-input-box input-title"
            type="text"
            name="sprite-name"
            value={name}
            onChange={onSpriteNameChange}
          />
          <input
            className="top-input-box input-username"
            name="name"
            type="text"
            onChange={handleChange}
            value={userName}
          />
        </div>
      </div>
      <div className="top-right">
        <Link to={`/${hashVal}`} style={{ textDecoration: 'none' }}>
          <div className="top-button">New Sprite</div>
        </Link>
        <div className="top-button">Export</div>
      </div>
    </div>
  );
};

export default Navbar;
