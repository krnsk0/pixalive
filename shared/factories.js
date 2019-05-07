const constants = require('./constants');

const layerFactory = (w, h) => {
  return {
    name: 'new layer',
    pixels: Array.from({ length: h }, () =>
      Array.from({ length: w }, () => null)
    )
  };
};
const fakeLayerFactory = (w, h) => {
  return {
    name: 'new layer',
    pixels: Array.from({ length: h }, () =>
      Array.from({ length: w }, () => {
        let h = Math.floor(Math.random() * 360);
        let s = Math.floor(Math.random() * 100);
        let l = Math.floor(Math.random() * 100);
        let o = Math.random();
        return { h, s, l, o };
      })
    )
  };
};

const frameFactory = () => {
  return {
    layers: []
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

const spriteFactory = hash => {
  return {
    hash,
    users: {},
    frames: []
  };
};

// make an empty sprite with one layer and one frame
// unless we're making fake data, then make more and use fake layer factory
const initializeEmptySprite = (hash, w, h, manuallyDisableFakeData = false) => {
  const sprite = spriteFactory(hash);
  if (constants.FACTORIES_MAKE_FAKE_DATA && !manuallyDisableFakeData) {
    for (let i = 0; i < constants.FAKE_FRAME_COUNT; i += 1) {
      const frame = frameFactory();
      for (let j = 0; j < constants.FAKE_LAYER_COUNT; j += 1) {
        frame.layers.push(fakeLayerFactory(w, h));
      }
      sprite.frames.push(frame);
    }
  } else {
    const layer = layerFactory(w, h);
    const frame = frameFactory();
    frame.layers.push(layer);
    sprite.frames.push(frame);
  }
  return sprite;
};

module.exports = {
  spriteFactory,
  userFactory,
  frameFactory,
  layerFactory,
  initializeEmptySprite
};
