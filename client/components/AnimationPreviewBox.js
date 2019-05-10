import React, { useContext, useState } from 'react';
import { SpriteContext } from '../contexts';
import { useInterval } from '../rendering';
import { SmallCanvas } from '../components';

const AnimationPreviewBox = () => {
  const sprite = useContext(SpriteContext);
  const [fps, setFps] = useState(10);
  let [frameIndex, setFrameIndex] = useState(0);

  let layers;
  if (sprite.frames[frameIndex]) {
    layers = sprite.frames[frameIndex].layers;
  }

  useInterval(
    () => {
      setFrameIndex(
        frameIndex === sprite.frames.length - 1
          ? (frameIndex = 0)
          : frameIndex + 1
      );
    },
    fps === 0 ? 99999999999999999 : 1000 / fps
  );

  const onRangeChange = evt => {
    setFps(+evt.target.value);
  };

  return (
    <div className="animation-container">
      <div className="animation-canvas-container">
        <SmallCanvas layers={layers} canvasWidth={190} canvasHeight={190} />
      </div>
      <div className="fps-range-selector">
        <span className="fps-display">{`${fps} FPS`}</span>
        <input
          className="fps-selector"
          type="range"
          name="fps"
          min="0"
          max="24"
          step="1"
          value={fps}
          onChange={onRangeChange}
        />
      </div>
    </div>
  );
};

export default AnimationPreviewBox;
