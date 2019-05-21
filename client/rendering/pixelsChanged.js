const pixelsChanged = (prevPixels, pixels) => {
  if (!prevPixels || !pixels) {
    return true;
  }

  for (let [y, row] of pixels.entries()) {
    for (let [x, pixel] of row.entries()) {
      if (pixel !== prevPixels[y][x]) {
        return true;
      }
    }
  }

  return false;
};

export default pixelsChanged;
