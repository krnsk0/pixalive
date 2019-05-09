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
  const [screenCoords, setScreenCoords] = useState({
    x: false,
    y: false
  });
  const screenCoordsRef = useRef();
  screenCoordsRef.current = screenCoords; // allows accessing current coords in closed-over scopes
  const spriteRef = useRef();
  spriteRef.current = sprite; // allows accessing current sprite in closed-over scopes
  const canvasRef = useRef(); // passed in to canvas below

  // set up canvas width an height after first mount
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = constants.CANVAS_WIDTH;
    canvas.height = constants.CANVAS_HEIGHT;
    canvas.style.width = constants.CANVAS_WIDTH;
    canvas.style.height = constants.CANVAS_HEIGHT;
  }, []);

  // set up event listener on socket change
  useEffect(() => {
    // store a reference to the canvas element itself
    const canvas = canvasRef.current;

    const onCanvasClick = () => {
      const pixelCoords = convertScreenCoordsToPixelCoords(
        screenCoordsRef.current,
        spriteRef.current
      );

      if (socket) {
        socket.emit(constants.MSG.CANVAS_CLICK, pixelCoords);
      }
    };

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
      canvas.addEventListener('click', onCanvasClick);
    }

    // a callback to disable the canvas listener
    return () => {
      canvas.removeEventListener('mousemove', throttledOnMouseMove);
      canvas.removeEventListener('click', onCanvasClick);
    };
  }, [socket]);

  // on every render
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // perform renders
    ctx.clearRect(0, 0, constants.CANVAS_WIDTH, constants.CANVAS_HEIGHT);
    renderBackdrop(ctx);
    renderPixels(ctx, sprite, socket);
    renderSelectedPixel(ctx, screenCoords, sprite);
    renderCursors(ctx, sprite);
  });

  return (
    <div>
      <canvas id="canvas" ref={canvasRef} />
    </div>
  );
};

export default SingleLayer;
