import React, { useContext } from 'react';
import { SocketContext, SpriteContext, PopupContext } from '../contexts';
const constants = require('../../shared/constants');
import { renderSmallCanvas } from '../rendering';
import gifshot from 'gifshot';
import download from 'downloadjs';

const GifExportButton = () => {
  const sprite = useContext(SpriteContext);
  const socket = useContext(SocketContext);
  const [popup, setPopup] = useContext(PopupContext);

  const onExportToGifClick = () => {
    if (socket) {
      // set up canvas and append
      const canvas = document.createElement('canvas');
      const width = sprite.frames[0].layers[0].pixels[0].length;
      const height = sprite.frames[0].layers[0].pixels.length;
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
    <div className="popup-button" onClick={onExportToGifClick}>
      Export GIF
    </div>
  );
};

export default GifExportButton;
