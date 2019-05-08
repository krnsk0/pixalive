import React, { useEffect, useRef, useContext, useState } from 'react';
import { SocketContext, SpriteContext } from '../contexts';
import {
  renderCursors,
  renderPixels,
  renderBackdrop,
  renderSelectedPixel,
  convertScreenCoordsToPixelCoords
} from '../rendering';
const constants = require('../../shared/constants');
const throttle = require('../../shared/throttle');

const SingleLayer = () => {
  const sprite = useContext(SpriteContext);
  const socket = useContext(SocketContext);

  // set up a ref to the canvas element we'll render below
  const canvasRef = useRef();

  // set up component state for which pixel is selected
  const [screenCoords, setScreenCoords] = useState({
    x: false,
    y: false
  });

  // set up canvas on load
  useEffect(() => {
    // store a reference to the canvas element itself
    const canvas = canvasRef.current;

    // set its width and height
    canvas.width = constants.CANVAS_WIDTH;
    canvas.height = constants.CANVAS_HEIGHT;
    canvas.style.width = constants.CANVAS_WIDTH;
    canvas.style.height = constants.CANVAS_HEIGHT;
  }, []);

  // set up event listener on socket change
  useEffect(() => {
    // store a reference to the canvas element itself
    const canvas = canvasRef.current;

    // event listener helper
    const throttledOnMouseMove = throttle(evt => {
      // get the relative coords of the mouse
      const canvasRect = canvas.getBoundingClientRect();
      const screenCoords = {
        x: evt.clientX - canvasRect.left,
        y: evt.clientY - canvasRect.top
      };

      // set selected pixel on local state
      setScreenCoords(screenCoords);

      // send them to the server
      socket.emit(constants.MSG.CURSOR_MOVE, screenCoords);
    }, constants.THROTTLE_MOUSE_SEND);

    // set up event listener for mouse movements
    if (socket) {
      canvas.addEventListener('mousemove', throttledOnMouseMove);
      // canvas.addEventListener('click', onCanvasClick);
    }

    // a callback to disable the canvas listener
    return () => {
      canvas.removeEventListener('mousemove', throttledOnMouseMove);
      // canvas.removeEventListener('click', onCanvasClick);
    };
  }, [socket]);

  // on every render
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // clear the canvas
    ctx.clearRect(0, 0, constants.CANVAS_WIDTH, constants.CANVAS_HEIGHT);

    // draw the background
    renderBackdrop(ctx);

    // draw pixels
    renderPixels(ctx, sprite, socket);

    // draw selected pixel
    renderSelectedPixel(ctx, screenCoords, sprite);

    // draw cursors
    renderCursors(ctx, sprite);
  });

  const onCanvasClick = evt => {
    // grab a current canvas ref
    // get the relative coords of the mouse
    const canvasRect = canvas.getBoundingClientRect();
    const screenCoords = {
      x: evt.clientX - canvasRect.left,
      y: evt.clientY - canvasRect.top
    };
    console.log('screenCoords: ', screenCoords);
    const pixelCoords = convertScreenCoordsToPixelCoords(screenCoords, sprite);

    if (socket) {
      socket.emit(constants.MSG.CANVAS_CLICK, pixelCoords);
    }
  };

  return (
    <div>
      <canvas
        id="canvas"
        ref={canvasRef}
        onClick={evt => onCanvasClick(evt, sprite)}
      />
    </div>
  );
};

export default SingleLayer;
