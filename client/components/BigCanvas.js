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

const BigCanvas = () => {
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
  const socketRef = useRef();
  socketRef.current = socket;

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
    const throttledSendCursorToServer = throttle((socket, coords) => {
      console.log('emitting mouse to server');
      socket && socket.emit(constants.MSG.CURSOR_MOVE, coords);
    }, constants.MSG.THROTTLE_MOUSE_SEND);

    const moveOnlyHanlder = evt => {
      const inCanvas = isMouseInsideCanvas(
        canvasRef.current,
        evt.clientX,
        evt.clientY
      );

      // get the previous X coord
      let prevX = '';
      if (socketRef.current) {
        const socketId = socketRef.current.id.slice(socket.nsp.length + 1);
        const users = spriteRef.current.users;
        if (users[socketId]) {
          prevX = users[socketId].x;
        }
      }

      // if in canvas, send move to server
      if (inCanvas) {
        const coords = convertWindowToCanvasCoords(
          canvasRef.current,
          evt.clientX,
          evt.clientY
        );
        setCanvasMouseCoords(coords);

        throttledSendCursorToServer(socket, coords);

        // if not in canvas, and if current cursor in our own state isn't already false, send false
      } else if (!inCanvas && prevX) {
        throttledSendCursorToServer(socket, false);
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

    // add + remove event listeners
    socket && window.addEventListener('mousedown', onWindowMouseDown);
    socket && window.addEventListener('mouseup', onWindowMouseUp);
    socket && window.addEventListener('mousemove', onWindowMouseMove);
    return () => {
      window.removeEventListener('mousedown', onWindowMouseDown);
      window.removeEventListener('mouseup', onWindowMouseUp);
      window.removeEventListener('mousemove', onWindowMouseMove);
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
    renderCursors(ctx, sprite, socket);
  });

  return (
    <div>
      <canvas ref={canvasRef} className="big-canvas" />
    </div>
  );
};

export default BigCanvas;
