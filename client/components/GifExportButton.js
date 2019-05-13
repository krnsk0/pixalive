import React, { useContext } from 'react';
import { SocketContext, SpriteContext } from '../contexts';
const constants = require('../../shared/constants');
import GIF from 'gif.js.optimized';
import { renderSmallCanvas } from '../rendering';

const GifExportButton = () => {
  const sprite = useContext(SpriteContext);
  const socket = useContext(SocketContext);

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

      // create gif object
      const gif = new GIF({
        workers: 2,
        quality: 10,
        workerScript: 'gif.worker.js',
        repeat: 0
      });

      // draw some layers
      ctx.clearRect(0, 0, width, height);
      const layers = sprite.frames[0].layers;
      renderSmallCanvas(ctx, layers, width, height);

      // add to gif
      gif.addFrame(canvas, { delay: 200 });

      // when done
      gif.on('finished', blob => {
        window.open(URL.createObjectURL(blob));
        document.body.removeChild(canvas);
      });

      // render
      gif.render();
    }
  };

  return (
    <div className="navbar-button" onClick={onExportToGifClick}>
      Export GIF
    </div>
  );
};

export default GifExportButton;
