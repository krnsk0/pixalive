import React, { useState, useContext, useEffect } from 'react';
import { SocketContext, SpriteContext } from '../contexts';
const constants = require('../../shared/constants');
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [name, setName] = useState('Untitled');
  const sprite = useContext(SpriteContext);
  const socket = useContext(SocketContext);
  let hashString =
    '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
  let hashVal;

  for (let i = 0; i < 10; i++) {
    hashVal = '';
    for (let j = 0; j < 12; j++) {
      hashVal += hashString[Math.floor(Math.random() * hashString.length)];
    }
  }

  useEffect(() => {
    if (socket) {
      if (sprite) {
        setName(sprite.name);
      }
    }
  }, [sprite]);

  const onSpriteNameChange = evt => {
    setName(evt.target.value);
    socket.emit(constants.MSG.UPDATE_SPRITE_NAME, evt.target.value);
  };
  return (
    <div className="top-section-container">
      <div className="top-left">
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
          <div className="app-title">PIXALIVE</div>
        </Link>
      </div>
      <div className="top-middle">
        <div className="sprite-title">
          <input
            className="input-name"
            type="text"
            name="sprite-name"
            value={name}
            onChange={onSpriteNameChange}
          />
        </div>
      </div>
      <div className="top-right">
        <Link
          to={`/${hashVal}`}
          style={{ textDecoration: 'none', color: '#212121' }}
        >
          <div className="top-button">Create Sprite</div>
        </Link>
        <div className="top-button">Export</div>
      </div>
    </div>
  );
};

export default Navbar;
