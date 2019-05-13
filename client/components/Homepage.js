import React from 'react';

const Homepage = () => {
    return (
        <div className="homepage-container">
            <div className="homepage-title">PIXALIVE</div>
            <div className="homepage-tagline-container">
                <div className="homepage-tagline">
                    <div className="homepage-tagline-title">Welcome to Pixalive! <br/>
                    Your free online editor  <br/>
                    for animated sprites and pixel art</div>
                <img
                    className="pixalive-screenshot"
                    src="homepage-screenshot.png"
                    width="700"
                    heigth="500"
                        />
                </div>

                <div className="create-sprite-container">
                    <div className="homepage-tagline-desc">Create a new sprite!</div>
                    <div className="homepage-create-sprite-button">
                        <div className="create-sprite-text">Create Sprite</div>
                    </div>
                </div>
                <div className="sprite-example-title">Example Sprites</div>
                <div id="sprite-examples-container">
                    <div className="sprite-ex">Ex Sprite 1</div>
                    <div className="sprite-ex">Ex Sprite 2</div>
                    <div className="sprite-ex">Ex Sprite 3</div>
                </div>
            </div>
        </div>
    )
}

export default Homepage;
