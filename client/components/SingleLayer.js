import React, { useEffect, useRef, useContext, useState } from 'react';
import { SocketContext, SpriteContext } from '../contexts';
import {
  renderCursors,
  renderBigCanvas,
  renderBackdrop,
  renderSelectedPixel,
  convertCanvasToPixelCoords,
  convertWindowToCanvasCoords,
  isMouseInsideCanvas
} from '../rendering';
const constants = require('../../shared/constants');
const throttle = require('../../shared/throttle');

const SingleLayer = () => {
  // context & state
  const sprite = useContext(SpriteContext);
  const socket = useContext(SocketContext);
  const [canvasMouseCoords, setCanvasMouseCoords] = useState({
    x: false,
    y: false
  });
  const [mouseClicked, setMouseClicked] = useState(false);

  // refs
  const canvasRef = useRef();
  const canvasMouseCoordsRef = useRef();
  canvasMouseCoordsRef.current = canvasMouseCoords;
  const spriteRef = useRef();
  spriteRef.current = sprite;
  const mouseClickedRef = useRef();
  mouseClickedRef.current = mouseClicked;

  // set up canvas width & height after first mount
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = constants.CANVAS_WIDTH;
    canvas.height = constants.CANVAS_HEIGHT;
    canvas.style.width = constants.CANVAS_WIDTH;
    canvas.style.height = constants.CANVAS_HEIGHT;
  }, []);

  // set up event listeners when socket connects
  useEffect(() => {
    // helper functions for event handlers
    const moveOnlyHanlder = evt => {
      const inCanvas = isMouseInsideCanvas(
        canvasRef.current,
        evt.clientX,
        evt.clientY
      );

      // if in canvas, send move to server
      if (inCanvas) {
        const coords = convertWindowToCanvasCoords(
          canvasRef.current,
          evt.clientX,
          evt.clientY
        );
        setCanvasMouseCoords(coords);
        socket && socket.emit(constants.MSG.CURSOR_MOVE, coords);
      } else {
        socket && socket.emit(constants.MSG.CURSOR_MOVE, false);
        setCanvasMouseCoords({
          x: false,
          y: false
        });
      }
    };
    const moveOrClickHandler = evt => {
      // are we in canvas?
      const inCanvas = isMouseInsideCanvas(
        canvasRef.current,
        evt.clientX,
        evt.clientY
      );
      // if in canvas and clicked, send click to server
      if (inCanvas && mouseClickedRef.current) {
        const pixelCoords = convertCanvasToPixelCoords(
          canvasMouseCoordsRef.current,
          spriteRef.current
        );
        socket && socket.emit(constants.MSG.CANVAS_CLICK, pixelCoords);
      }
    };

    // event handler callbacks
    const onWindowMouseDown = evt => {
      if (evt.which === 1) {
        setMouseClicked(true); // set the state to clicked
        moveOrClickHandler(evt); // fire event to server if in canvas
      }
    };
    const onWindowMouseUp = evt => {
      if (evt.which === 1) {
        setMouseClicked(false);
      }
    };
    const onWindowMouseMove = evt => {
      moveOnlyHanlder(evt); // fire move events to server if in canvas
      moveOrClickHandler(evt); // fire click events to server if clicked and in canvas
    };
    const throttledOnWindowMouseMove = throttle(
      onWindowMouseMove,
      constants.MSG.THROTTLE_MOUSE_SEND
    );

    // add + remove event listeners
    socket && window.addEventListener('mousedown', onWindowMouseDown);
    socket && window.addEventListener('mouseup', onWindowMouseUp);
    socket && window.addEventListener('mousemove', throttledOnWindowMouseMove);
    return () => {
      window.removeEventListener('mousedown', onWindowMouseDown);
      window.removeEventListener('mouseup', onWindowMouseUp);
      window.removeEventListener('mousemove', throttledOnWindowMouseMove);
    };
  }, [socket]);

  // on every render, call rendering functions
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, constants.CANVAS_WIDTH, constants.CANVAS_HEIGHT);
    renderBackdrop(ctx);
    renderBigCanvas(ctx, sprite, socket);
    renderSelectedPixel(ctx, canvasMouseCoords, sprite);
    renderCursors(ctx, sprite);
  });

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default SingleLayer;
