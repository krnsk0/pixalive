const express = require('express');
const path = require('path');
const socketio = require('socket.io');
const morgan = require('morgan');
const chalk = require('chalk');
const constants = require('../shared/constants');

const PORT = process.env.PORT || 3000;
const pixalive = require('./pixalive.js');

// initialize express
const app = express();

// logging middleware
app.use(morgan('tiny'));

// static file-serving middleware
app.use(express.static(path.join(__dirname, '.', 'static')));

//Express routes for database requests
// app.use('/api', require('./api'))

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

// initialize the app
pixalive(namespacedIo);
