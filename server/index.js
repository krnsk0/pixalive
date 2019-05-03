const express = require('express');
const path = require('path');
const socketio = require('socket.io');
const morgan = require('morgan');
const constants = require('../shared/constants');
const PORT = process.env.PORT || 3000;

// initialize express
const app = express();

// logging middleware
app.use(morgan('tiny'));

// static file-serving middleware
app.use(express.static(path.join(__dirname, '.', 'static')));

// sends index.html
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'static/index.html'));
});

// serve static files and index.html for anything else
const server = app.listen(PORT, () => console.log(`Serving on ${PORT}`));

// initialize socket.io
const io = socketio(server);

// log connections & disconnections
io.on(constants.MSG.CONNECTION, socket => {
  console.log('connection:', socket.id);
  socket.on(constants.MSG.DISCONNECT, reason => {
    console.log('disconnection:', socket.id);
    console.log('reason:', reason);
  });
});

/**************************************
 *   vv THE FUN STUFF STARTS HERE vv
 **************************************/

const state = {};

io.on(constants.MSG.CONNECTION, socket => {
  // create a cursor in our state object
  // its key will be the socket id
  const socketId = socket.id;
  if (!state[socketId]) {
    state[socketId] = {};
  }

  // send the current state
  socket.emit(constants.MSG.STATE_UPDATE, state);

  // when a cursor moves...
  socket.on(constants.MSG.CURSOR_MOVE, coords => {
    state[socketId].x = coords.x;
    state[socketId].y = coords.y;
    io.emit(constants.MSG.STATE_UPDATE, state);
  });

  // when this client disconnects
  socket.on(constants.MSG.DISCONNECT, socket => {
    // delete this cursor from our state
    delete state[socketId];
  });
});
