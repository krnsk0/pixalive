import React, { useEffect, useRef } from 'react';
// import { SpriteContext, SocketContext } from '../contexts';
// const constants = require('../../shared/constants');
import { renderPixels, renderBackdrop } from '../rendering';

const SmallCanvas = props => {
  const { canvasWidth, canvasHeight } = props;
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
    // renderPixels(ctx, sprite, socket);
  });

  return <canvas className="frame-canvas" ref={canvasRef} />;
};

export default SmallCanvas;
