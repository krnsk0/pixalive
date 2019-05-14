const constants = require('../shared/constants');
const chalk = require('chalk');
const {
  userFactory,
  frameFactory,
  layerFactory
} = require('../shared/factories');
const loadData = require('./db/loadData');
const saveData = require('./db/saveData');
const eventHandlers = require('./eventHandlers');
const { printState } = require('./utils');

module.exports = (namespacedIo, io) => {
  // root of our server-side state tree
  // a hash of namespaces/sprites
  const state = {};

  namespacedIo.on(constants.MSG.CONNECT, async socket => {
    // store our sprite hash and socket id
    const spriteHash = socket.nsp.name.slice(1);
    const socketId = socket.id.slice(socket.nsp.name.length + 1);

    // does this namespace exist? if not, create it
    if (!state[spriteHash]) {
      try {
        state[spriteHash] = await loadData(spriteHash);
      } catch (err) {
        console.error(err);
      }
    }

    // make a new user object and add it
    state[spriteHash].users[socketId] = userFactory(socketId);

    // send the current sprite to the user who just connected
    // socket.emit(constants.MSG.SEND_SPRITE, state[spriteHash]);

    // send the sprite to everyone
    io.of(`/${spriteHash}`).emit(constants.MSG.SEND_SPRITE, state[spriteHash]);

    // print state for debugging
    console.log(chalk.yellow('LOGGING ROOMS AFTER USER CONNECT'));
    printState(state);

    // load and register event handlers
    Object.values(eventHandlers).forEach(handler =>
      handler(socket, io.of(`/${spriteHash}`), state, spriteHash, socketId)
    );
  });
};
