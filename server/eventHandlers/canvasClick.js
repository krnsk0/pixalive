const constants = require('../../shared/constants');
const updateSelectedColor = require('./updateSelectedColor');
const paintCan = require('./paintCan');
const { cloneDeep } = require('lodash');

module.exports = (socket, namespacedIo, state, spriteHash, socketId) => {
  // when a cursor moves...
  socket.on(constants.MSG.CANVAS_CLICK, coords => {
    // update their coords
    const selectedColor = state[spriteHash].users[socketId].selectedColor;
    let selectedTool = state[spriteHash].users[socketId].selectedTool;
    const selectedFrame = state[spriteHash].users[socketId].selectedFrame;
    const selectedLayer = state[spriteHash].users[socketId].selectedLayer;
    //generates the list of changes to the image on server state
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
    } else if (selectedTool === constants.TOOLS.BRUSH_16){
      const x = coords.x
      const y = coords.y
      const field = [{x, y}, {x: x+1, y}, {x, y: y+1}, {x: x+1, y: y+1}]
      field.map(a => changeList.push({x: a.x, y: a.y, frameIdx: selectedFrame, layerIdx: selectedLayer, color: cloneDeep(selectedColor)}))
      console.log(changeList)
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

    // send change list only if we actually made changes
    if (madeChange) {
      namespacedIo.emit(constants.MSG.SEND_CHANGE_LIST, changeList);
    }
  });
};
