import React, { useEffect, useRef, useContext } from 'react';
import { SocketContext, SpriteContext } from '../contexts';
const constants = require('../../shared/constants');

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
    const onMouseMove = evt => {
      // grab a current canvas ref
      const canvasRect = canvas.getBoundingClientRect();

      // get the relative coords of the mouse
      const coords = {
        x: evt.clientX - canvasRect.left,
        y: evt.clientY - canvasRect.top
      };

      // send them to the server
      socket.emit(constants.MSG.CURSOR_MOVE, coords);
    };

    // set up event listener for mouse movements
    if (socket) {
      canvas.addEventListener('mousemove', onMouseMove);
    }

    // a callback to disable the canvas listener
    return () => {
      canvas.removeEventListener('mousemove', onMouseMove);
    };
  }, [socket]);

  // on every render
  useEffect(() => {
    // store a reference to the canvas element itself
    // as well as a drawing context
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // clear the canvas
    ctx.clearRect(0, 0, constants.CANVAS_WIDTH, constants.CANVAS_HEIGHT);

    // render it!
    for (const [id, coords] of Object.entries(sprite.users)) {
      // draw a cursor
      const half = Math.floor(constants.CURSOR_SIZE / 2);
      ctx.fillRect(
        coords.x - half,
        coords.y - half,
        constants.CURSOR_SIZE,
        constants.CURSOR_SIZE
      );

      // draw the socket
      ctx.font = '15px Courier';
      ctx.fillText(id, coords.x + 5, coords.y);
    }
  });

  return (
    <div>
      <canvas id="canvas" ref={canvasRef} />
    </div>
  );
};

export default SingleLayer;
