const express = require('express');
const path = require('path');
const socketio = require('socket.io');
const morgan = require('morgan');
const chalk = require('chalk');
const constants = require('../shared/constants');
const factories = require('../shared/factories');
const PORT = process.env.PORT || 3000;

// initialize express
const app = express();

// logging middleware
app.use(morgan('tiny'));

// static file-serving middleware
app.use(express.static(path.join(__dirname, '.', 'static')));

// sends index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '.', 'static/editor.html'));
});

// start the server
const server = app.listen(PORT, () =>
  console.log(chalk.green(`serving on ${PORT}`))
);

// initialize socket.io
const io = socketio(server);

// connection logging for dynamic socket namespacing
// store the dynamic namespace IO manager as namespacedIo
// regex matches all non-empty strings
const namespacedIo = io.of(/.*/).on(constants.MSG.CONNECT, socket => {
  const namespace = socket.nsp.name;
  const socketId = socket.id.slice(socket.nsp.name.length + 1);
  console.log(
    chalk.blue(
      `index.js -> CONNECTION -> namespace: ${namespace}, socketId: ${socketId}`
    )
  );
  socket.on(constants.MSG.DISCONNECT, reason => {
    console.log(
      chalk.red(
        `index.js -> CONNECTION -> namespace: ${namespace}, socketId: ${socketId}, reason: ${reason}`
      )
    );
  });
});

/**************************************
 *   vv THE FUN STUFF STARTS HERE vv
 **************************************/

// root of our server-side state tree
// right now this is a hash of namespaces/sprites
const state = {};

namespacedIo.on(constants.MSG.CONNECT, socket => {
  // store our sprite hash and socket id
  const spriteHash = socket.nsp.name.slice(1);
  const socketId = socket.id.slice(socket.nsp.name.length + 1);

  // does this namespace exist? if not, create it
  if (!state[spriteHash]) {
    console.log(
      chalk.blue(`index.js -> NEW SPRITE -> spriteHash: ${spriteHash}`)
    );
    state[spriteHash] = factories.spriteFactory(spriteHash);
  }

  // make a new user object and add it
  state[spriteHash].users[socketId] = factories.userFactory(socketId);

  // send the current drawing object
  socket.emit(constants.MSG.SEND_SPRITE, state[spriteHash]);

  // when a cursor moves...
  socket.on(constants.MSG.CURSOR_MOVE, coords => {
    // update their coords
    state[spriteHash].users[socketId].x = coords.x;
    state[spriteHash].users[socketId].y = coords.y;

    // send the state tree to everyone editing this sprite
    namespacedIo.emit(constants.MSG.SEND_SPRITE, state[spriteHash]);
  });

  // when this client leaves
  socket.on(constants.MSG.DISCONNECT, socket => {
    // take the user out of the namespace/sprite
    delete state[spriteHash].users[socketId];

    // emit it so it updates for everyone still connectd
    namespacedIo.emit(constants.MSG.SEND_SPRITE, state[spriteHash]);

    // get the number of users left in this namespace
    const usersLeft = Object.keys(state[spriteHash].users).length;

    // if nobody left, free up the memory
    if (!usersLeft) {
      console.log(
        chalk.red(`index.js -> DELETING SPRITE -> spriteHash: ${spriteHash}`)
      );
      delete state[spriteHash];
    }
  });
});
