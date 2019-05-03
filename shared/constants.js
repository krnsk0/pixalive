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

const deepFreeze = require('deep-freeze');

module.exports = deepFreeze({
  EXAMPLE_CONSTANT: 'example value',
  MSG: {
    CONNECTION: 'connection',
    DISCONNECT: 'disconnect',
    CONNECT: 'connect'
  }
});
