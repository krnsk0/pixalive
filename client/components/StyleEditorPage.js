import React from 'react';

import {
  LayerPicker,
  ToolPicker,
  AnimationPreviewBox,
  BigCanvas,
  ColorPicker,
  LayerTools,
  ResizeSprite,
  CopyTools
} from './';

const StyleEditorPage = () => {
  return (
    <div className="middle-section-container">
      <div className="middle-section-left">
        <ToolPicker />
        <ColorPicker />
        <ResizeSprite />
        <LayerPicker />
      </div>
      <div>
        <BigCanvas />
      </div>
      <div className="middle-section-right">
        <AnimationPreviewBox />
        <LayerTools />
        <CopyTools />
      </div>
    </div>
  );
};

export default StyleEditorPage;
