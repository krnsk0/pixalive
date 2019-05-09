const chalk = require('chalk');

module.exports = state => {
  let roomList = [];

  for (let [hash, sprite] of Object.entries(state)) {
    let roomData = {
      namespace: hash,
      users: Object.keys(sprite.users).length
    };
    roomList.push(roomData);
  }

  roomList.forEach(room => {
    console.log(
      chalk.yellow(`${room.users} USER(S) IN ROOM ${room.namespace}`)
    );
  });

  if (roomList.length === 0) {
    console.log(chalk.yellow('NO ACTIVE ROOMS'));
  }
};
