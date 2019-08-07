import React, { useContext } from 'react';
import { PopupContext } from '../contexts';
import {
  ExportStringButton,
  ImportStringButton,
  GifExportButton,
  PngExport
} from './';

const ImportExportPopup = () => {
  const [popup, setPopup] = useContext(PopupContext);
  return (
    <div className="popup-outer-container" onClick={null}>
      <div className="popup">
        <ExportStringButton />
        <ImportStringButton />
        <GifExportButton />
        <PngExport />

        <div className="close-popup" onClick={() => setPopup(false)}>
          close
        </div>
      </div>
    </div>
  );
};

export default ImportExportPopup;
