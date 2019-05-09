const cursorMove = require('./cursorMove');
const updateSelectedColor = require('./updateSelectedColor');
const updateSelectedFrame = require('./updateSelectedFrame');
const addNewFrame = require('./addNewFrame');
const selectLayer = require('./selectLayer');
const addNewLayer = require('./addNewLayer');
const setPreviewLayer = require('./setPreviewLayer');
const disconnect = require('./disconnect');
const selectTool = require('./selectTool');
const canvasClick = require('./canvasClick');
const layerNameChange = require('./layerNameChange');
const deleteSelectedLayer = require('./deleteSelectedLayer');
const moveSelectedLayerUp = require('./moveSelectedLayerUp');
const moveSelectedLayerDown = require('./moveSelectedLayerDown');

module.exports = {
  cursorMove,
  updateSelectedColor,
  updateSelectedFrame,
  addNewFrame,
  selectLayer,
  addNewLayer,
  setPreviewLayer,
  disconnect,
  canvasClick,
  selectTool,
  layerNameChange,
  deleteSelectedLayer,
  moveSelectedLayerUp,
  moveSelectedLayerDown
};
