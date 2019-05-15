import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  let hashString =
    '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
  let hashVal;

  for (let i = 0; i < 10; i++) {
    hashVal = '';
    for (let j = 0; j < 12; j++) {
      hashVal += hashString[Math.floor(Math.random() * hashString.length)];
    }
  }

  return (
    <div className="homepage-container">
      <div className="left-container">
        <div className="homepage-title">
          <img src="/logo.png" />
        </div>
        <div className="homepage-tagline-container">
          <div className="homepage-tagline-container">
            <div className="homepage-tagline-title">
              Welcome to Pixalive! <br />
              A free, multi-user, real-time editor <br />
              for animated sprites and pixel art
            </div>
            <img
              className="pixalive-screenshot"
              src="homepage-screenshot.png"
              width="500"
            />
          </div>

          <div className="create-sprite-container">
            <div className="homepage-tagline-desc">Create a new sprite:</div>

            <div className="homepage-create-sprite-button">
              <Link
                to={`/${hashVal}`}
                style={{ textDecoration: 'none', color: '#212121' }}
              >
                <div className="create-sprite-text">Create Sprite</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="right-container">
        <img className="sample-sprite" src="sample1.gif" />
        <img className="sample-sprite" src="sample2.gif" />
        <img className="sample-sprite" src="homepage-screenshot.png" />
      </div>
    </div>
  );
};

export default Homepage;
