import React, { useEffect, useRef } from 'react';
import {
  renderSmallCanvas,
  renderBackdrop,
  compositeLayers
} from '../rendering';

const SmallCanvas = props => {
  const { canvasWidth, canvasHeight, layers, canvasType } = props;
  const canvasRef = useRef();

  // set up canvas width & height after first mount
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.width = canvasWidth;
    canvas.style.height = canvasHeight;
  }, []);

  // on every render, do rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    renderBackdrop(ctx);
    const pixels = compositeLayers(layers);
    renderSmallCanvas(ctx, pixels, canvasWidth, canvasHeight);
  });

  return <canvas ref={canvasRef} className={'small-canvas ' + canvasType} />;
};

export default SmallCanvas;
