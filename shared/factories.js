// some placeholder factory functions

const spriteFactory = hash => {
  return {
    hash,
    users: {},
    frames: []
  };
};

const userFactory = socketId => {
  return {
    socketId,
    selectedFrame: 0,
    selectedLayer: 0,
    selectedColor: { h: 0, s: 0, l: 0, o: 1.0 },
    selectedTool: 'pen',
    x: null,
    y: null
  };
};

const frameFactory = () => {
  return {
    layers: []
  };
};

const layerFactory = (w, h) => {
  return {
    name: 'new layer',
    pixels: Array.from({ length: h }, () =>
      Array.from({ length: w }, () => null)
    )
  };
};

const pixelFactory = (h = 0, s = 0, l = 0, o = 1.0) => {
  return {
    h,
    s,
    l,
    o
  };
};

// make an empty sprite with one layer and one frame
const initializeEmprySprite = (hash, w, h) => {
  const sprite = spriteFactory(hash);
  const layer = layerFactory(w, h);
  const frame = frameFactory();
  frame.layers.push(layer);
  sprite.frames.push(frame);
  return sprite;
};

module.exports = {
  spriteFactory,
  userFactory,
  frameFactory,
  layerFactory,
  pixelFactory,
  initializeEmprySprite
};
