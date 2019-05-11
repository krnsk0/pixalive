import React, { useContext, useState, useEffect } from 'react';
import { SocketContext, SpriteContext } from '../contexts';
const constants = require('../../shared/constants');

const ConnectionInfo = () => {
  const socket = useContext(SocketContext);
  const sprite = useContext(SpriteContext);
  const [userName, setUserName] = useState('No name')

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
  } else {
    userCount = '[loading]';
  }
  //Watch the sprite object for changes and update the user name
  useEffect(() => {
    if (socketId) {
      if (sprite.user[socketId]){
        setUserName(sprite.users[socketId].name)
      }
    }
  }, [sprite])

  //Watch for changes in the user name field and send those to state
  const handleChange = changedName => {
    setUserName(changedName);
    socket.emit(constants.MSG.UPDATE_USERNAME, changedName);
  };

  return (
    <div>
      <div>Your collaboration username: </div>
      <input name='name' type='text' onChange={handleChange} value={userName} />
      <div>The current socket namespace is: {namespace}</div>
      <div>Users in this namespace: {userCount}</div>
    </div>
  );
};

export default ConnectionInfo;

{/* <input name='name' type='text' onChange={props.handleChange} value={ userName } /> */}
