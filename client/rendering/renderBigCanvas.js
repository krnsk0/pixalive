/* eslint-disable complexity */
const constants = require('../../shared/constants');

// renders a single layer. when preview is true
// this decreases all opacity proprtionate to the number of layers
const renderSingleLayer = (
  layer,
  ctx,
  preview,
  layerCount,
  isLayerSelected
) => {
  const pixels = layer.pixels;

  // calculate pixel dims
  const pixelWidth = constants.CANVAS_WIDTH / pixels[0].length;
  const pixelHeight = constants.CANVAS_HEIGHT / pixels.length;

  // iterate rows / cols
  for (let [y, row] of pixels.entries()) {
    for (let [x, pixel] of row.entries()) {
      // if pixel is null, color is transparent
      if (!pixel) {
        ctx.fillStyle = `hsl(0, 0%, 0%, 0)`;
      }

      // if pixel is not null, set the color
      else {
        // if preview mode is on, adjust the opacity of each layer proportionate to the # of layers
        // if it's the selected layer, render with zero opacity
        let opacity;
        if (preview && !isLayerSelected) {
          opacity = 1 / layerCount;
        } else {
          opacity = 1.0;
        }

        // set color
        ctx.fillStyle = `hsl(${pixel.h}, ${pixel.s}%, ${pixel.l}%, ${opacity})`;
      }

      // fill it in
      ctx.fillRect(x * pixelWidth, y * pixelHeight, pixelWidth, pixelHeight);
    }
  }
};

const renderBigCanvas = (ctx, sprite, socket) => {
  // get the selected frame from the sprite
  let selectedFrame = 0;
  if (socket) {
    const socketId = socket.id.slice(socket.nsp.length + 1);
    if (sprite.users[socketId]) {
      selectedFrame = sprite.users[socketId].selectedFrame;
    }
  }
  let frame = sprite.frames[selectedFrame];

  // get the selected layer
  let selectedLayer = 0;
  if (socket) {
    const socketId = socket.id.slice(socket.nsp.length + 1);
    if (sprite.users[socketId]) {
      selectedLayer = sprite.users[socketId].selectedLayer;
    }
  }

  // is preview true or false
  let preview = true;
  if (socket && Object.keys(sprite.users).length) {
    const socketId = socket.id.slice(socket.nsp.length + 1);
    if (sprite.users[socketId]) {
      preview = sprite.users[socketId].preview;
    }
  }

  // if preview is true, render all layers
  if (preview) {
    const layerCount = frame.layers.length;
    frame.layers.forEach((currentLayer, layerIndex) => {
      renderSingleLayer(
        currentLayer,
        ctx,
        preview,
        layerCount,
        layerIndex === selectedLayer
      );
    });
  }
  // if preview is false, render only selected layer
  else if (!preview) {
    const layer = sprite.frames[selectedFrame].layers[selectedLayer];
    renderSingleLayer(layer, ctx, preview);
  }
};

export default renderBigCanvas;
