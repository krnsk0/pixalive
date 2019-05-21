const constants = require('../../shared/constants');
const updateSelectedColor = require('./updateSelectedColor');
const paintCan = require('./paintCan');
const { cloneDeep } = require('lodash');
const brushChanges = require('../eventHandlers/brushChanges');

const deepUnEquals = (a, b) => {
  for (let k in a) {
    if (!(b[k] && a[k] === b[k])) {
      return true;
    }
  }
  return false;
};

module.exports = (socket, namespacedIo, state, spriteHash, socketId) => {
  // when a cursor moves...
  socket.on(constants.MSG.CANVAS_CLICK, coords => {
    // update their coords
    const selectedColor = state[spriteHash].users[socketId].selectedColor;
    let selectedTool = state[spriteHash].users[socketId].selectedTool;
    const selectedFrame = state[spriteHash].users[socketId].selectedFrame;
    const selectedLayer = state[spriteHash].users[socketId].selectedLayer;
    const layerToDraw =
      state[spriteHash].frames[selectedFrame].layers[selectedLayer].pixels;
    const previousColor =
      state[spriteHash].frames[selectedFrame].layers[selectedLayer].pixels[
        coords.y
      ][coords.x];
    const brushes = [
      constants.TOOLS.BRUSH_16,
      constants.TOOLS.BRUSH_32,
      constants.TOOLS.BRUSH_48,
      constants.TOOLS.BRUSH_64
    ];
    const prevGrid = cloneDeep(layerToDraw);
    //generates the list of changes to the image on server state

    let history = state[spriteHash].users[socketId].history;
    let changeList = [];

    if (selectedTool === constants.TOOLS.PEN) {
      changeList.push({
        x: coords.x,
        y: coords.y,
        frameIdx: selectedFrame,
        layerIdx: selectedLayer,
        color: selectedColor
      });
    } else if (selectedTool === constants.TOOLS.ERASER) {
      changeList.push({
        x: coords.x,
        y: coords.y,
        frameIdx: selectedFrame,
        layerIdx: selectedLayer,
        color: null
      });
    } else if (selectedTool === constants.TOOLS.EYE_DROPPER) {
      //get the cell color at coords
      let x = coords.x;
      let y = coords.y;
      let selectedColor =
        state[spriteHash].frames[selectedFrame].layers[selectedLayer].pixels[y][
          x
        ];
      //reset users selected color on state to that color
      //reset selected tool to pen
      if (selectedColor) {
        state[spriteHash].users[socketId].selectedColor = selectedColor;
        state[spriteHash].users[socketId].selectedTool = constants.TOOLS.PEN;
        selectedTool = constants.TOOLS.PEN;
        //broadcast new selected color / tool
        namespacedIo.emit(constants.MSG.SELECTED_COLOR_UPDATE, {
          selectedColor,
          socketId
        });
        namespacedIo.emit(constants.MSG.SELECTED_TOOL_UPDATE, {
          selectedTool,
          socketId
        });
      }
    } else if (selectedTool === constants.TOOLS.PAINT_CAN) {
      let x = coords.x;
      let y = coords.y;
      let currentColor =
        state[spriteHash].frames[selectedFrame].layers[selectedLayer].pixels[y][
          x
        ];
      let grid =
        state[spriteHash].frames[selectedFrame].layers[selectedLayer].pixels;
      let changes = paintCan(
        grid,
        x,
        y,
        selectedColor,
        currentColor,
        (visited = {})
      );
      changeList = changes.map(a => ({
        x: a.x,
        y: a.y,
        frameIdx: selectedFrame,
        layerIdx: selectedLayer,
        color: cloneDeep(selectedColor)
      }));
      // history.unshift(changeList.map(a => ({
      //   x: a.x,
      //   y: a.y,
      //   frameIdx: selectedFrame,
      //   layerIdx: selectedLayer,
      //   color: previousColor
      // })))
    } else if (brushes.includes(selectedTool)) {
      changeList = changeList.concat(
        brushChanges(selectedTool, coords.x, coords.y, layerToDraw).map(a => ({
          x: a.x,
          y: a.y,
          frameIdx: selectedFrame,
          layerIdx: selectedLayer,
          color: cloneDeep(selectedColor)
        }))
      );
      // history.unshift(changeList.map(a => ({
      //   x: a.x,
      //   y: a.y,
      //   frameIdx: selectedFrame,
      //   layerIdx: selectedLayer,
      //   color: previousColor
      // })))
    }

    //takes list of changes, changes pixels
    let madeChange = false;
    // eslint-disable-next-line complexity
    changeList.forEach(c => {
      // get old value
      const oldColor =
        state[spriteHash].frames[c.frameIdx].layers[c.layerIdx].pixels[c.y][
          c.x
        ];

      // see if there's a change
      let different = false;
      // are either (but not both) null?
      if ((oldColor && !c.color) || (!oldColor && c.color)) {
        different = true;
      } else if (!(oldColor === null && c.color === null)) {
        // loop keys and look for changes
        for (let k of Object.keys(oldColor)) {
          if (oldColor[k] !== c.color[k]) {
            different = true;
            break;
          }
        }
      }

      // if different, make a change and set the change flag to true
      if (different) {
        state[spriteHash].frames[c.frameIdx].layers[c.layerIdx].pixels[c.y][
          c.x
        ] = c.color;
        madeChange = true;
      }
    });

    const hist = changeList.map(c => ({
      x: c.x,
      y: c.y,
      frameIdx: selectedFrame,
      layerIdx: selectedLayer,
      color: prevGrid[c.y][c.x]
    }));

    if (madeChange) {
      if (hist.length > 1 || deepUnEquals(hist, history) || !history.length) {
        if (history.length < 25) {
          state[spriteHash].users[socketId].history.unshift(hist);
        } else {
          state[spriteHash].users[socketId].history.pop();
          state[spriteHash].users[socketId].history.unshift(hist);
        }
      }
    }

    // send change list only if we actually made changes
    if (madeChange) {
      namespacedIo.emit(constants.MSG.SEND_CHANGE_LIST, changeList);
    }
  });
};
