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
    SEND_SPRITE: 'send_sprite', // a server-to-client event
    UPDATE_SELECTED_COLOR: 'update_selected_color' // a client-to-server event
  },
  CANVAS_HEIGHT: 600,
  CANVAS_WIDTH: 800,
  CURSOR_SIZE: 5, // odd numbers only or it'll be off-center
  NEW_SPRITE_WIDTH: 32,
  NEW_SPRITE_HEIGHT: 32
});
