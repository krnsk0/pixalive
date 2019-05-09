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

    console.log('ON CONNECTION:', state);

    // send the current drawing object
    socket.emit(constants.MSG.SEND_SPRITE, state[spriteHash]);

    // load and register event handlers
    Object.values(eventHandlers).forEach(handler =>
      handler(socket, io.of(`/${spriteHash}`), state, spriteHash, socketId)
    );
  });
};
