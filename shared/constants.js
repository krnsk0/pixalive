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
    CONNECTION: 'connection',
    DISCONNECT: 'disconnect',
    CONNECT: 'connect',
    CURSOR_MOVE: 'cursor_move',
    STATE_UPDATE: 'state_update'
  },
  CANVAS_HEIGHT: 600,
  CANVAS_WIDTH: 800,
  CURSOR_SIZE: 5 // odd numbers only or it'll be off-center
});
