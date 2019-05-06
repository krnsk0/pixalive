import React, { useContext } from 'react';
import { SpriteContext, SocketContext } from '../contexts';

const FramePicker = () => {
  const sprite = useContext(SpriteContext);
  const socket = useContext(SocketContext);
  const frames = sprite.frames;

  return (
    <div style={{ border: '1px solid black' }}>
      frames:
      {frames.map((frame, i) => (
        <div key={i}>frame {i}</div>
      ))}
    </div>
  );
};

export default FramePicker;
