import React, { useContext, useState } from 'react';
import { SocketContext, SpriteContext, PopupContext } from '../contexts';
import download from 'downloadjs';

const renderLayer = (layer, ctx, spriteWidth, spriteHeight, startX, startY) => {
  const pixels = layer.pixels;

  // calculate pixel dims
  const pixelWidth = spriteWidth / pixels[0].length;
  const pixelHeight = spriteHeight / pixels.length;

  // iterate rows / cols
  for (let [y, row] of pixels.entries()) {
    for (let [x, pixel] of row.entries()) {
      if (pixel) {
        // set color
        ctx.fillStyle = `hsl(${pixel.h}, ${pixel.s}%, ${pixel.l}%, 1.0)`;
      } else {
        ctx.fillStyle = `hsl(0, 0%, 0%, 0.0)`;
      }

      // fill it in
      ctx.fillRect(
        x * pixelWidth + startX,
        y * (pixelHeight, pixelWidth) + startY,
        pixelWidth,
        pixelHeight
      );
    }
  }
};

const PngExportButton = () => {
  const sprite = useContext(SpriteContext);
  const socket = useContext(SocketContext);
  const [popup, setPopup] = useContext(PopupContext);
  const [sizeMultiplier, setSizeMultiplier] = useState(2);

  const onExportToPngClick = () => {
    if (socket) {
      // set up canvas and append
      const canvas = document.createElement('canvas');
      const spriteWidth =
        sprite.frames[0].layers[0].pixels[0].length * sizeMultiplier;
      const spriteHeight =
        sprite.frames[0].layers[0].pixels.length * sizeMultiplier;
      const frameCount = sprite.frames.length;

      // calculate the canvas h and w
      let spritesheetWidth;
      let spriteSheetHeight;
      if (frameCount <= 8) {
        spritesheetWidth = spriteWidth * frameCount + frameCount;
        spriteSheetHeight = spriteHeight;
      } else {
        spritesheetWidth = spriteWidth * 8 + 8;
        const spriteSheetRows = Math.ceil(frameCount / 8);
        spriteSheetHeight = spriteSheetRows * spriteHeight + spriteSheetRows;
      }
      canvas.width = spritesheetWidth;
      canvas.height = spriteSheetHeight;
      canvas.style.width = spritesheetWidth;
      canvas.style.height = spriteSheetHeight;
      const ctx = canvas.getContext('2d');
      document.body.appendChild(canvas);

      // for each frame
      sprite.frames.forEach((frame, idx) => {
        const startX = (idx % 8) * (spriteWidth + 1);
        const startY = Math.floor(idx / 8) * (spriteHeight + 1);
        frame.layers.forEach(layer => {
          renderLayer(layer, ctx, spriteWidth, spriteHeight, startX, startY);
        });
      });

      const png = canvas.toDataURL('image/png');
      download(png, 'spritesheet.png', 'image/png');
      document.removeChild(canvas);
      setPopup(false);
    }
  };

  return (
    <div className="gif-export-button-container">
      <select
        className="gif-size-selector"
        value={sizeMultiplier}
        onChange={e => {
          setSizeMultiplier(e.target.value);
        }}
      >
        <option value={1}>1x</option>
        <option value={2}>2x</option>
        <option value={4}>4x</option>
        <option value={8}>8x</option>
        <option value={16}>16x</option>
      </select>
      <div className="popup-button" onClick={onExportToPngClick}>
        Export PNG Spritesheet
      </div>
    </div>
  );
};

export default PngExportButton;
