import React, { useContext, useState, useEffect } from 'react';
import { SocketContext, SpriteContext } from '../contexts';
const constants = require('../../shared/constants');

const ConnectionInfo = () => {
  const socket = useContext(SocketContext);
  const sprite = useContext(SpriteContext);
  const [userName, setUserName] = useState('collaborator')

  let socketId, namespace, userCount;
  //Do we still need this?
  // if the socket is connected, get the id and namespace
  if (socket) {
    socketId = socket.id.slice(socket.nsp.length + 1);
    namespace = socket.nsp;
  } else {
    socketId = '[loading]';
    namespace = '[loading]';
  }
  // if the sprite has loaded, save the # of users
  if (sprite) {
    userCount = Object.keys(sprite.users).length;
    console.log("STATE", sprite)
  } else {
    userCount = '[loading]';
  }
  //Watch the sprite object for changes and update the user name
  useEffect(() => {
    if (sprite) {
      if (socketId !== '[loading]') {
        if (sprite.users[socketId]){
          setUserName(sprite.users[socketId].name)
        }
    }}
  }, [sprite])

  //Watch for changes in the user name field and send those to state
  const handleChange = event => {
    setUserName(event.target.value);
    if (socket) {
      socket.emit(constants.MSG.UPDATE_USERNAME, event.target.value);
    }
  };

  return (
    <div>
      <div>Your usernanme: </div>
      <input name='name' type='text' onChange={handleChange} value={userName} />
      <div>Please note, this name will be visible to any users currently in the same drawing as you. We suggest you do not use your full name as your user name.</div>
      <div>The current socket namespace is: {namespace}</div>
      <div>Users in this namespace: {userCount}</div>
    </div>
  );
};

export default ConnectionInfo;


