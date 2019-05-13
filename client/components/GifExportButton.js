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
        repeat: 0,
        width,
        height,
        debug: true
      });

      // for each frame
      sprite.frames.forEach(frame => {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        renderSmallCanvas(ctx, frame.layers, width, height);
        const img = document.createElement('img');
        img.src = canvas.toDataURL();
        document.body.appendChild(img);
        const prompt = window.prompt('test', 'test');
        gif.addFrame(img);
      });

      // when done
      gif.on('finished', blob => {
        // destroy the canvas
        document.body.removeChild(canvas);

        // create image
        const img = document.createElement('img');
        img.src = URL.createObjectURL(blob);
        document.body.appendChild(img);

        window.open(URL.createObjectURL(blob));
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
