// some placeholder factory functions

module.exports.spriteFactory = hash => {
  return {
    hash,
    users: {},
    frames: []
  };
};

module.exports.userFactory = socketId => {
  return {
    socketId,
    x: null,
    y: null
  };
};
