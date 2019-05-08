import React, { useEffect, useRef, useContext } from 'react';
import { SocketContext, SpriteContext } from '../contexts';
import { renderCursors, renderPixels } from '../utils';
const constants = require('../../shared/constants');
const throttle = require('../../shared/throttle');

const SingleLayer = () => {
  const sprite = useContext(SpriteContext);
  const socket = useContext(SocketContext);

  // set up a ref to the canvas element we'll render below
  const canvasRef = useRef();

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
      // grab a current canvas ref
      const canvasRect = canvas.getBoundingClientRect();

      // get the relative coords of the mouse
      const coords = {
        x: evt.clientX - canvasRect.left,
        y: evt.clientY - canvasRect.top
      };

      // send them to the server
      socket.emit(constants.MSG.CURSOR_MOVE, coords);
    }, constants.THROTTLE_MOUSE_SEND);

    // set up event listener for mouse movements
    if (socket) {
      canvas.addEventListener('mousemove', throttledOnMouseMove);
    }

    // a callback to disable the canvas listener
    return () => {
      canvas.removeEventListener('mousemove', throttledOnMouseMove);
    };
  }, [socket]);

  // on every render
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // clear the canvas
    ctx.clearRect(0, 0, constants.CANVAS_WIDTH, constants.CANVAS_HEIGHT);

    // draw pixels
    renderPixels(ctx, sprite, socket);

    // draw cursors
    renderCursors(ctx, sprite);
  });

  return (
    <div>
      <canvas id="canvas" ref={canvasRef} />
    </div>
  );
};

export default SingleLayer;
