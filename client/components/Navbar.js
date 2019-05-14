import React, { useState, useContext, useEffect } from 'react';
import { SocketContext, SpriteContext } from '../contexts';
const constants = require('../../shared/constants');

const Navbar = () => {
    const [name, setName ] = useState('Untitled');
    const sprite = useContext(SpriteContext);
    const socket = useContext(SocketContext);
    useEffect(() => {
        if (socket) {
          if (sprite) {
            setName(sprite.name);
          }
        }
      }, [sprite]);

    const onSpriteNameChange = (evt) => {
        setName(evt.target.value)
        socket.emit(constants.MSG.UPDATE_SPRITE_NAME, evt.target.value);
    }
    return (
        <div className="top-section-container">
            <div className="top-left">
                <div className="app-title">PIXALIVE</div>
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
                <div className="top-button">Create Sprite</div>
                <div className="top-button">Export</div>
            </div>
        </div>
    )
}

export default Navbar;
