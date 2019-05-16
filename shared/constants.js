/***********************
 *    SHARED CONSTANTS
 *
 *    This file allows use to declare constants that are available for
 *    use on both client and server. To add constants, add keys to the
 *    object exported below. To use them, put this line at the top of
 *    the file you want to use them in:
 *
 *    const constants = require('../shared/constants');
 *
 *    Then, to get at a constant, use constants.THING
 *
 */

const deepFreeze = require('deep-freeze');

module.exports = deepFreeze({
  MSG: {
    CONNECT: 'connect', // connection event
    DISCONNECT: 'disconnect', // disconnection event
    CURSOR_MOVE: 'cursor_move', // a client-to-server event
    CURSOR_UPDATE: 'cursor_update', // a server-to-client event
    SEND_SPRITE: 'send_sprite', // a server-to-client event
    UPDATE_SELECTED_COLOR: 'update_selected_color', // a client-to-server event
    SELECTED_COLOR_UPDATE: 'selected_color_update', // a server-to-client event
    UPDATE_SELECTED_FRAME: 'update_selected_frame', // a client-to-server event
    ADD_NEW_FRAME: 'add_new_frame', // a client-to-server event
    SELECT_LAYER: 'select_layer', // a client-to-server event
    ADD_NEW_LAYER: 'add_new_layer', // a client-to-server event
    SET_PREVIEW_LAYER: 'set_preview_layer', // a client-to-server event
    CANVAS_CLICK: 'canvas_click', // a server-to-client event
    DELETE_SELECTED_LAYER: 'delete_selected_layer', // a client-to-server event
    EDIT_SELECTED_LAYER_NAME: 'edit_selected_layer_name', // a client-to-server event
    MOVE_SELECTED_LAYER_UP: 'move_selected_layer_up', // a client-to-server event
    MOVE_SELECTED_LAYER_DOWN: 'move_selected_layer_down', // a client-to-server event
    SEND_CHANGE_LIST: 'send_change_list', // a server-to-client event
    SHIFT_FRAME_LEFT: 'shift_frame_left', // a client-to-server event
    SHIFT_FRAME_RIGHT: 'shift_frame_right', // a client-to-server event
    DELETE_FRAME: 'delete_frame', // a client-to-server event
    DUPLICATE_SELECTED_FRAME: 'shift_frame_right', // a client-to-server event
    SELECTED_TOOL_UPDATE: 'selected_tool_update',
    UPDATE_USERNAME: 'update_username', //a client-to-server event
    SEND_USERNAME: 'send_username', //a server-to-client event
    UPDATE_SPRITE_NAME: 'update_sprite_name', //a client-to-server event
    SEND_SPRITE_NAME: 'send_sprite_name', //a server-to-client event
    TRANSLATE_SELECTED_LAYER: 'translate_selected_layer', //a client-to-server event
    COPY_LAYER: 'copy_layer', //a client-to-server event
    UPLOAD_PIXELS: 'upload_pixels',
    RESIZE_SPRITE: 'resize_sprite',
    ROTATE_SELECTED_LAYER: 'rotate_selected_layer',
    COPY_LAYER_TO_ONE_FRAME: 'copy_layer_to_one_frame',
    SEND_HISTORY_LIST: 'send_history_list', //a server-to-client event
    UNDO: 'undo'
  },
  TOOLS: {
    SELECT_TOOL: 'select_tool', // a client-to-server event
    PEN: 'pen',
    ERASER: 'eraser',
    EYE_DROPPER: 'eye_dropper',
    PAINT_CAN: 'paint_can',
    BRUSH_16: 'brush_16',
    BRUSH_32: 'brush_32',
    BRUSH_48: 'brush_48',
    BRUSH_64: 'brush_64'
  },
  CANVAS_HEIGHT: 576, // measured in screen pixels
  CANVAS_WIDTH: 576, // measured in screen pixels
  CURSOR_SIZE: 5, // odd numbers only or it'll be off-center
  NEW_SPRITE_WIDTH: 16,
  NEW_SPRITE_HEIGHT: 16,
  THROTTLE_MOUSE_SEND: 100, // in milliseconds
  BACKDROP_PIXEL_SIZE: 10, // in screen pixels
  PIXEL_HIGHLIGHT_COLOR: `hsl(0, 0%, 50%, 0.5`,
  FRAME_CAP: 32,
  LAYER_CAP: 6,
  FPS_CAP: 24,
  SL_PICKER_WIDTH: 100,
  SL_PICKER_HEIGHT: 100,
  H_PICKER_WIDTH: 100,
  SAVE_INTERVAL: 5000
});
