import React, { useEffect, useRef } from 'react';
import {
  renderSmallCanvas,
  renderBackdrop,
  compositeLayers,
  pixelsChanged
} from '../rendering';

const SmallCanvas = props => {
  const {
    canvasWidth,
    canvasHeight,
    layers,
    canvasType,
    identifier = null,
    alwaysUpdate = false
  } = props;
  const canvasRef = useRef();
  const pixelsRef = useRef();

  // set up canvas width & height after first mount
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.width = canvasWidth;
    canvas.style.height = canvasHeight;
  }, []);

  // on every render...
  useEffect(() => {
    // composite layers and get ready to compare
    const pixels = compositeLayers(layers);
    const prevPixels = pixelsRef.current;
    pixelsRef.current = pixels;

    // check for changes and render if changes
    if (pixelsChanged(prevPixels, pixels) || alwaysUpdate) {
      // uncomment to check when frames re-render
      // !alwaysUpdate && console.log(`rerendering ${identifier}`);
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      renderBackdrop(ctx);
      renderSmallCanvas(ctx, pixels, canvasWidth, canvasHeight);
    }
  });

  return <canvas ref={canvasRef} className={'small-canvas ' + canvasType} />;
};

export default SmallCanvas;
