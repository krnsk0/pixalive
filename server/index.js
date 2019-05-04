const express = require('express');
const path = require('path');
const socketio = require('socket.io');
const morgan = require('morgan');
const chalk = require('chalk');

const constants = require('../shared/constants');
const PORT = process.env.PORT || 3000;

// initialize express
const app = express();

// logging middleware
app.use(morgan('tiny'));

// static file-serving middleware
app.use(express.static(path.join(__dirname, '.', 'static')));

// sends index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '.', 'static/index.html'));
});

// serve static files and index.html for anything else
const server = app.listen(PORT, () => console.log(`Serving on ${PORT}`));

// initialize socket.io
const io = socketio(server);

// dynamic socket namespacing
const nspIo = io.of(/.+/).on('connect', socket => {
  const namespace = socket.nsp.name;
  const socketId = socket.id.slice(socket.nsp.name.length + 1);
  console.log(`CONNECTION -> namespace: ${namespace}, socketId: ${socketId}`);
  socket.on(constants.MSG.DISCONNECT, reason => {
    console.log(`CONNECTION -> namespace: ${namespace}, socketId: ${socketId}`);
    console.log('reason:', reason);
  });
});

/**************************************
 *   vv THE FUN STUFF STARTS HERE vv
 **************************************/

// some placeholder object factory functions
const spriteFactory = hash => {
  return {
    hash,
    users: {},
    frames: []
  };
};

const userFactory = socketId => {
  return {
    socketId,
    x: null,
    y: null
  };
};

// root of our server-side state tree
// right now this is a hash of namespaces/sprites
const state = {};

nspIo.on(constants.MSG.CONNECTION, socket => {
  // store our sprite hash and socket id
  const spriteHash = socket.nsp.name.slice(1);
  const socketId = socket.id.slice(socket.nsp.name.length + 1);

  // does this namespace exist? if not, create it
  if (!state[spriteHash]) {
    console.log(`NEW SPRITE -> spriteHash: ${spriteHash}`);
    state[spriteHash] = spriteFactory(spriteHash);
  }

  // make a new user object and add it
  state[spriteHash].users[socketId] = userFactory(socketId);

  // send the current state
  socket.emit(constants.MSG.STATE_UPDATE, state);

  // when a cursor moves...
  socket.on(constants.MSG.CURSOR_MOVE, coords => {
    // update their coords
    state[spriteHash].users[socketId].x = coords.x;
    state[spriteHash].users[socketId].y = coords.y;

    // send the state tree to everyone editing this sprite
    nspIo.emit(constants.MSG.STATE_UPDATE, state);
  });

  // when this client disconnects
  socket.on(constants.MSG.DISCONNECT, socket => {
    // take the user out of the namespace/sprite
    delete state[spriteHash].users[socketId];

    // emit it so it updates for everyone still connectd
    nspIo.emit(constants.MSG.STATE_UPDATE, state);

    // is the namespace now empty?
    const usersLeft = Object.keys(state[spriteHash].users).length;

    // close it
    if (!usersLeft) {
      delete state[spriteHash];
    }
  });
});
