const convertWindowMouseCoordsToCanvasMouseCoords = (canvas, x, y) => {
  const canvasRect = canvas.getBoundingClientRect();
  return {
    x: x - canvasRect.left,
    y: y - canvasRect.top
  };
};

export default convertWindowMouseCoordsToCanvasMouseCoords;
