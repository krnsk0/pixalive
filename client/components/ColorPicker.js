import React, { useState, useContext, useEffect, useRef } from 'react';
import { SocketContext, SpriteContext } from '../contexts';
const constants = require('../../shared/constants');

const ColorPicker = () => {
  const slCanvasRef = useRef();
  const hCanvasRef = useRef();
  const [H, setH] = useState(0);
  const [S, setS] = useState(0);
  const [L, setL] = useState(0);
  const PIXEL_SIZE = 10;

  // set up canvas width & height after first mount
  useEffect(() => {
    const slCanvas = slCanvasRef.current;
    slCanvas.width = 100;
    slCanvas.height = 100;

    const hCanvas = hCanvasRef.current;
    hCanvas.width = 100;
    hCanvas.height = 10;
  }, []);

  // paint the sl canvas
  useEffect(() => {
    const slCanvas = slCanvasRef.current;
    const ctx = slCanvas.getContext('2d');
    ctx.clearRect(0, 0, constants.SL_PICKER_WIDTH, constants.SL_PICKER_HEIGHT);
    for (let y = 0; y < constants.SL_PICKER_HEIGHT; y += PIXEL_SIZE) {
      for (let x = 0; x < constants.SL_PICKER_HEIGHT; x += PIXEL_SIZE) {
        ctx.fillStyle = `hsl(${H}, ${x}%, ${100 - y}%, 1.0)`;
        ctx.fillRect(x, y, PIXEL_SIZE, PIXEL_SIZE);
      }
    }
  }, [H]);
  // paint the H canvas just once
  useEffect(() => {
    const hCanvas = hCanvasRef.current;
    const ctx = hCanvas.getContext('2d');
    ctx.clearRect(0, 0, constants.H_PICKER_WIDTH, constants.H_PICKER_HEIGHT);
    for (let x = 0; x < constants.H_PICKER_WIDTH; x += PIXEL_SIZE) {
      ctx.fillStyle = `hsl(${(x / 100) * 360}, ${100}%, ${50}%, 1.0)`;
      ctx.fillRect(x, 0, PIXEL_SIZE, PIXEL_SIZE);
    }
  }, []);

  const selectedColorStyle = {
    backgroundColor: `hsl(${H}, ${S}%, ${L}%, 1.0)`
  };

  //Click handler that converts x axis to H value
  function hPicker (xLocation) {
    //Get the ref to the hCanvas
    const hCanvas = hCanvasRef.current;
    let hRect = hCanvas.getBoundingClientRect()
    let hRectLeft = hRect.left
    let hRectRight = hRect.right
    const rectX = xLocation - hRectLeft
    let totalRange = hRectRight - hRectLeft
    //Get the index of the pixel clicked
    let pixelIndex = Math.floor((rectX / totalRange) * PIXEL_SIZE)
    //Use the pixel index to get the return H color
    let returnHColor = pixelIndex * 36
    //Set the H color to require a re-render of the SL Canvas
    setH(returnHColor)

  }

  return (
    <div className="color-picker-container">
      <canvas
      ref={hCanvasRef}
      onClick={e => {
        hPicker(e.clientX)
      }}
       className="h-picker"
       />
      <canvas ref={slCanvasRef} className="sl-picker" />
      <div className="selected-color-row">
        <div>Selected color</div>
        <div className="swatch" style={selectedColorStyle} />
      </div>
    </div>
  );
};

export default ColorPicker;
