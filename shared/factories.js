const layerFactory = (w, h, layerOrder, name = 'new layer') => {
  return {
    name,
    layerOrder,
    pixels: Array.from({ length: h }, () =>
      Array.from({ length: w }, () => null)
    )
  };
};

const frameFactory = frameOrder => {
  return {
    frameOrder,
    layers: []
  };
};

const userFactory = socketId => {
  return {
    preview: false,
    socketId,
    selectedFrame: 0,
    selectedLayer: 0,
    selectedColor: { h: 0, s: 0, l: 0, o: 1.0 },
    selectedTool: 'pen',
    x: false,
    y: false,
    name: 'collaborator'
  };
};

const spriteFactory = hash => {
  return {
    hash,
    users: {},
    frames: []
  };
};

// make an empty sprite with one layer and one frame
const initializeEmptySprite = (hash, w, h) => {
  const sprite = spriteFactory(hash);
  const frame = frameFactory(sprite.frames.length);
  const layer = layerFactory(w, h, frame.layers.length);
  frame.layers.push(layer);
  sprite.frames.push(frame);
  return sprite;
};

module.exports = {
  spriteFactory,
  userFactory,
  frameFactory,
  layerFactory,
  initializeEmptySprite
};
