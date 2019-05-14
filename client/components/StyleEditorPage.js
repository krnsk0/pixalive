import React from 'react';

import {
  LayerPicker,
  ToolPicker,
  AnimationPreviewBox,
  BigCanvas,
  ColorPicker,
  LayerTools,
  LayerCopyButton,
  ResizeSprite
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
        <LayerCopyButton />
        <LayerTools />
      </div>
    </div>
  );
};

export default StyleEditorPage;
