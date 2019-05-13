import React from 'react';

import {
  LayerPicker,
  ToolPicker,
  AnimationPreviewBox,
  BigCanvas,
  ColorPicker,
  LayerTools,
  LayerCopyButton
} from './';

const StyleEditorPage = () => {
  return (
    <div className="middle-section-container">
      <div className="left-section-container">
        <ToolPicker />
        <ColorPicker />
      </div>
      <div>
        <BigCanvas />
      </div>
      <div className="right-section-container">
        <AnimationPreviewBox />
        <LayerPicker />
        <LayerCopyButton />
        <LayerTools />
      </div>
    </div>
  );
};

export default StyleEditorPage;
