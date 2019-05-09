import React, { useContext, useState } from 'react';
import { SpriteContext, SocketContext } from '../contexts';
import { useInterval } from '../rendering';
import { SetInterval } from './SetInterval'
const constants = require('../../shared/constants');


const AnimationPreviewBox = () => {
    const sprite = useContext(SpriteContext);
    const [fps, setFps] = useState(24);
    const [frameIndex, setFrameIndex] = useState(0);
    const layers = sprite.frames[frameIndex].layers;


    const setInterval = () => {
        useInterval(() => {
        setFrameIndex(frameIndex + 1);
    }, fps === 0 ? 99999999999999999 : 1000 / fps )
        return <h1>{frameIndex}</h1>
    }

    const onRangeChange = (evt) => {
        setFps(+evt.target.value);
    }


    return (
        <div className="animation-container">
            <div className="animation-canvas">
                {/* <SmallCanvas layers={layers} canvasWidth="200px" canvasHeigth="200px" /> */}
            </div>
            <div className="fps-range-selector">
                <span className="fps-display">{`${fps} FPS`}</span>
                <input
                 type="range"
                 name="fps"
                 min="0"
                 max="24"
                 step="1"
                 onChange={onRangeChange}
                 />
            </div>
        </div>
    )
}

export default AnimationPreviewBox;
