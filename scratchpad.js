const spriteFactory = hash => {
  return {
    hash,
    users: {
      'asdf2452ASDF': {
        name: 'bob',
        socketId: 'asdf2452ASDF',
        undoHistory: '???',
        x: 100,
        y: 50,
        selectedTool: 'pen',
        selectedcolor: { h: 200, s: 50, l: 50, o: 74 },
        selectedFrame: 1,
        selectedLayer: 1,
        brushSettings: []
      }
    },
    frames: [
      {
        layers: [
          {
            pixels: [
              [
                { h: 0, s: 0, l: 0, o: 0 },
                { h: 0, s: 0, l: 0, o: 0 },
                { h: 0, s: 0, l: 0, o: 0 }
              ],
              [
                { h: 0, s: 0, l: 0, i: 0 },
                { h: 0, s: 0, l: 0, i: 0 },
                { h: 0, s: 0, l: 0, i: 0 }
              ],
              [
                { h: 0, s: 0, l: 0, i: 0 },
                { h: 0, s: 0, l: 0, i: 0 },
                { h: 0, s: 0, l: 0, i: 0 }
              ]
            ]
          }
        ]
      }
    ]
  };
};

// a new sprite! wow!
const sprite = spriteFactory('IJ#RWOGJ#OI%JIEO');

canvas = canvasRef.current
ctx = canvas.getContext('2d')
pixelSize =

const pixels = sprite.frames[0].layers[0]
for (let [row, y] of pixels.entries()) {
  for (let [pixel, x] of row.entries()) {
    ctx.fillColor(`hsl(${pixel.h}, ${pixel.s}), ${pixel.l}, ${pixel.o}`)
    // hsl(255, 50, 50, 50)
    ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize)
  }
}

for (let y = 0; y < pixels.length; y += 1) {
  for (let x = 0; x < pixels[0].length; x += 1) {
    // do stuff
  }
}
