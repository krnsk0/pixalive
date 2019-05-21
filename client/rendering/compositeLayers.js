const compositeLayers = layers => {
  // initialize output array
  const height = layers[0].pixels.length;
  const width = layers[0].pixels[0].length;
  const output = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => null)
  );

  layers.forEach(layer => {
    const pixels = layer.pixels;

    for (let [y, row] of pixels.entries()) {
      for (let [x, pixel] of row.entries()) {
        if (pixel) {
          output[y][x] = pixel;
        }
      }
    }
  });
  return output;
};

export default compositeLayers;
