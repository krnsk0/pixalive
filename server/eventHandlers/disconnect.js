const constants = require('../../shared/constants');
const saveData = require('../db/saveData');
const chalk = require('chalk');
const { printState } = require('../utils');

module.exports = (socket, namespacedIo, state, spriteHash, socketId) => {
  // when this client leaves
  socket.on(constants.MSG.DISCONNECT, async () => {
    // take the user out of the namespace/sprite
    delete state[spriteHash].users[socketId];

    // emit it so it updates for everyone still connectd
    namespacedIo.emit(constants.MSG.SEND_SPRITE, state[spriteHash]);

    // get the number of users left in this namespace
    const usersLeft = Object.keys(state[spriteHash].users).length;

    // if nobody left, free up the memory
    if (!usersLeft) {
      await saveData(state[spriteHash]);
      console.log(
        chalk.red(`index.js -> DELETING SPRITE -> spriteHash: ${spriteHash}`)
      );
      delete state[spriteHash];
    }
    // log the room state
    console.log(chalk.yellow('LOGGING ROOMS AFTER USER DISCONNECT'));
    printState(state);
  });
};
