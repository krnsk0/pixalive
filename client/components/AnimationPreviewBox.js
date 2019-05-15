import React, { useContext, useState, useEffect } from 'react';
import { SpriteContext, AnimationResetContext } from '../contexts';
import { useInterval } from '../rendering';
import { SmallCanvas } from '../components';
const constants = require('../../shared/constants');

const AnimationPreviewBox = () => {
  const sprite = useContext(SpriteContext);
  const [fps, setFps] = useState(10);
  let [frameIndex, setFrameIndex] = useState(0);
  const [animationReset, setAnimationReset] = useContext(AnimationResetContext);

  // handle animation resets when the user deletes a frame
  useEffect(() => {
    if (animationReset == true) {
      setAnimationReset(false);
      setFrameIndex(0);
    }
  }, [animationReset]);

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
        <SmallCanvas
          layers={layers}
          canvasWidth={192}
          canvasHeight={192}
          canvasType="animation"
        />
      </div>
      <div className="fps-range-selector-container">
        <div className="fps-display-text">{`${fps} FPS`}</div>
        <input
          className="fps-selector"
          type="range"
          name="fps"
          min="0"
          max={constants.FPS_CAP}
          step="1"
          value={fps}
          onChange={onRangeChange}
        />
      </div>
    </div>
  );
};

export default AnimationPreviewBox;
