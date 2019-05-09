const isMouseInsideCanvas = (canvas, x, y) => {
  const canvasRect = canvas.getBoundingClientRect();

  return (
    x > canvasRect.left &&
    y > canvasRect.top &&
    x < canvasRect.right &&
    y < canvasRect.bottom
  );
};

export default isMouseInsideCanvas;
