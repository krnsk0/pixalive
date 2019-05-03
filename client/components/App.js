import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
const constants = require('../../shared/constants');

const App = () => {
  // set up a ref to the canvas element we'll render below
  const canvasRef = useRef();

  // state for the socket id so we can display it
  const [socketId, setSocketId] = useState('');

  // things that happen on component mount!
  useEffect(() => {
    // store a reference to the canvas element itself
    // as well as a drawing context
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // set its width and height
    canvas.width = constants.CANVAS_WIDTH;
    canvas.height = constants.CANVAS_HEIGHT;
    canvas.style.width = constants.CANVAS_WIDTH;
    canvas.style.height = constants.CANVAS_HEIGHT;

    // set up our websocket
    const socket = io();
    socket.on(constants.MSG.CONNECT, () => {
      // store our socket id
      const id = socket.id;
      console.log('connection id:', id);
      setSocketId(id);
    });

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
    canvas.addEventListener('mousemove', onMouseMove);

    // when we get a state update from the server...
    socket.on(constants.MSG.STATE_UPDATE, state => {
      // clear the canvas
      ctx.clearRect(0, 0, constants.CANVAS_WIDTH, constants.CANVAS_HEIGHT);

      // render it!
      for (const [id, coords] of Object.entries(state)) {
        // draw a cursor
        const half = Math.floor(constants.CURSOR_SIZE / 2);
        ctx.fillRect(
          coords.x - half,
          coords.y - half,
          constants.CURSOR_SIZE,
          constants.CURSOR_SIZE
        );

        // draw the id
        ctx.font = '15px Courier';
        ctx.fillText(id, coords.x + 5, coords.y);
      }
    });

    // a callback to disable the canvas listener
    return () => {
      canvas.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div>
      <div>This client's socket id is {socketId}</div>
      <canvas id="canvas" ref={canvasRef} />
    </div>
  );
};

export default App;
