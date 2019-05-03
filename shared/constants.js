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
 *    Then, to get at a constant, use constants.EXAMPLE_CONSTANT
 *
 */

module.exports = Object.freeze({
  EXAMPLE_CONSTANT: 'example value',
  MSG: {
    CONNECTION: 'connection',
    DISCONNECT: 'disconnect',
    CONNECT: 'connect'
  }
});
