import React, { useContext, useState } from 'react';
import { SocketContext, SpriteContext, PopupContext } from '../contexts';
const constants = require('../../shared/constants');
import { renderSmallCanvas } from '../rendering';
import gifshot from 'gifshot';
import download from 'downloadjs';

const GifExportButton = () => {
  const sprite = useContext(SpriteContext);
  const socket = useContext(SocketContext);
  const [popup, setPopup] = useContext(PopupContext);
  const [sizeMultiplier, setSizeMultiplier] = useState(2);
  const onExportToGifClick = () => {
    if (socket) {
      // set up canvas and append
      const canvas = document.createElement('canvas');
      const width =
        sprite.frames[0].layers[0].pixels[0].length * sizeMultiplier;
      const height = sprite.frames[0].layers[0].pixels.length * sizeMultiplier;
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = width;
      canvas.style.height = height;
      const ctx = canvas.getContext('2d');
      document.body.appendChild(canvas);

      // initialize images array
      const imagesArray = [];

      // for each frame
      sprite.frames.forEach(frame => {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        renderSmallCanvas(ctx, frame.layers, width, height);
        imagesArray.push(canvas.toDataURL());
      });

      // build gif from the images
      gifshot.createGIF(
        {
          images: imagesArray,
          gifWidth: width,
          gifHeight: height,
          numWorkers: 5,
          sampleInterval: 1
        },
        result => {
          // download the gif
          if (!result.error) {
            download(result.image, 'image.gif', 'image/gif');
            setPopup(false);
          }
        }
      );
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
      <div className="popup-button" onClick={onExportToGifClick}>
        Export GIF
      </div>
    </div>
  );
};

export default GifExportButton;
