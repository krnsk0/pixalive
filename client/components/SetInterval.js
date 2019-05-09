import React, { useContext, useState } from 'react';
import { SpriteContext, SocketContext } from '../contexts';
import { useInterval } from '../rendering';

const SetInterval = props => {
  const sprite = useContext(SpriteContext);
  const [frameIndex, setFrameIndex] = useState(0);
  //const layers = sprite.frames[frameIndex].layers;
  const { fps } = props;

  useInterval(
    () => {
      setFrameIndex(frameIndex + 1);
    },
    fps === 0 ? 99999999999999999 : 1000 / fps
  );

  return <h1>{frameIndex}</h1>;
};

export default SetInterval;
