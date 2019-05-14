import React, { useState, useContext, useEffect } from 'react'
import { SocketContext, SpriteContext } from '../contexts';
const constants = require('../../shared/constants');

const  NewSpriteSize = () =>  {
  const socket = useContext(SocketContext);
  const sprite = useContext(SpriteContext)

useEffect(() => {
  if (sprite) {
    setSpriteSize(sprite.frames[0].layers[0].pixels.length)
  }
},[sprite])

const [spriteSize, setSpriteSize] = useState()
const brushes = [constants.TOOLS.BRUSH_16,constants.TOOLS.BRUSH_32,constants.TOOLS.BRUSH_48,constants.TOOLS.BRUSH_64]
  
  const handleSubmit = (evt) => {
    evt.preventDefault()
    if (socket) {
      socket.emit(constants.MSG.RESIZE_SPRITE, spriteSize);
      socket.emit(constants.TOOLS.SELECT_TOOL, constants.TOOLS.PEN)
    }
  }
  
  

  return (
    <form onSubmit={handleSubmit}>
        <select value={spriteSize} onChange={(e) => {
          setSpriteSize(e.target.value)
          }}>
          <option value={16}>16x16</option>
          <option value={32}>32x32</option>
          <option value={48}>48x48</option>
          <option value={64}>64x64</option>
        </select>
      <input type='submit' value='Resize sprite'></input>
    </form>
  );
}

export default NewSpriteSize