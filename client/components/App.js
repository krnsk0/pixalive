import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
const constants = require('../../shared/constants');

const App = () => {
  // set up a ref to the canvas element we'll render below
  const canvasRef = useRef();

  // state for the socket id so we can display it
  // state for the current namespace so we can display it
  const [socketId, setSocketId] = useState('');
  const [namespace, setNamespace] = useState('');
  const [userCount, setUserCount] = useState(0);

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

    // set up our websocket based on the URL's path component
    const socket = io(window.location.pathname);
    socket.on(constants.MSG.CONNECT, () => {
      console.log(socket);
      // store our socket id
      // trim the nsp from the start
      const id = socket.id.slice(socket.nsp.length + 1);
      console.log('connection id:', id);
      setSocketId(id);

      // store our namespace
      console.log('namespace', socket.nsp);
      setNamespace(socket.nsp);
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

    // when we get a sprite update from the server...
    socket.on(constants.MSG.SEND_SPRITE, sprite => {
      // store current connected user count
      setUserCount(Object.keys(sprite.users).length);

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

    // a callback to disable the canvas listener
    return () => {
      canvas.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div>
      <div>This client's socket id is {socketId}</div>
      <div>The current socket namespace is {namespace}</div>
      <div>
        {userCount - 1} other user{userCount > 2 && 's'} in this namespace
      </div>
      <canvas id="canvas" ref={canvasRef} />
    </div>
  );
};

export default App;
