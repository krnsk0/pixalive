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
    UPDATE_SELECTED_FRAME: 'update_selected_frame', // a client-to-server event
    ADD_NEW_FRAME: 'add_new_frame', // a client-to-server event
    SELECT_LAYER: 'select_layer', // a client-to-server event
    ADD_NEW_LAYER: 'add_new_layer', // a client-to-server event
    SET_PREVIEW_LAYER: 'set_preview_layer' // a client-to-server event
  },
  CANVAS_HEIGHT: 512,
  CANVAS_WIDTH: 512,
  CURSOR_SIZE: 5, // odd numbers only or it'll be off-center
  NEW_SPRITE_WIDTH: 16,
  NEW_SPRITE_HEIGHT: 16,
  FACTORIES_MAKE_FAKE_DATA: true,
  FAKE_FRAME_COUNT: 4,
  FAKE_LAYER_COUNT: 4,
  THROTTLE_MOUSE_SEND: 25, // in milliseconds
  BACKDROP_PIXEL_SIZE: 10 // in screen pixels
});
