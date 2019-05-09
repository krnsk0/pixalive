import React, { useContext, useState } from 'react';
import { SpriteContext } from '../contexts';
import { useInterval } from '../rendering';
import { SmallCanvas } from '../components'


const AnimationPreviewBox = () => {
    const sprite = useContext(SpriteContext);
    const [fps, setFps] = useState(24);
    let [frameIndex, setFrameIndex] = useState(0);

    const layers = sprite.frames[frameIndex].layers;

    useInterval(() => {
        setFrameIndex(frameIndex === sprite.frames.length - 1 ? frameIndex = 0 : frameIndex + 1);
    }, fps === 0 ? 99999999999999999 : 1000 / fps )


    const onRangeChange = (evt) => {
        setFps(+evt.target.value);
    }


    return (
        <div className="animation-container">
            <div className="animation-canvas">
                <SmallCanvas layers={layers} canvasWidth={200} canvasHeight={200} />
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