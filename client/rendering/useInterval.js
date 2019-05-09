import React, { useState, useEffect, useRef } from 'react';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
      console.log('callback changed');
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
      console.log('delayed changed');
    function tick() {
        console.log('tick');
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default useInterval;
