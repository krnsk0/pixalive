import React from 'react';

import {
    LayerPicker,
    ToolPicker,
    AnimationPreviewBox,
    BigCanvas,
    ColorPicker
} from './';


const StyleEditorPage = () => {


    return (
        <div className="middle-section-container">
            <div className="left-section-container">
                <ToolPicker />
                <ColorPicker />
            </div>
            <div className="big-canvas">
                <BigCanvas />
            </div>
            <div className="right-section-container">
                <AnimationPreviewBox />
                <LayerPicker />
            </div>
        </div>
    )
}

export default StyleEditorPage;
