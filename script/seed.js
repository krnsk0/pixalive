const db = require('../server/db');
const Sequelize = require('sequelize');
// const Sprites = require('../server/db/models/sprites')
// const Frames = require('../server/db/models/frames')
// const Layers = require('../server/db/models/layers')
const { Sprites, Frames, Layers } = require('../server/db/models');

const hashString =
  '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';

async function seed() {
  let grid1 = [];
  let grid2 = [];
  let colorX = Math.ceil(Math.random() * 360);

  // for (let i = 0; i < 18; i++){
  //     let color1 = i % 2 === 0 ? colorX : 200
  //     let p = {h: color1, s: 100, l: 50, o: .5}
  //     i <= 9 ? grid1.push(p) : grid2.push(p)
  // }
  for (let i = 0; i < 3; i++) {
    let currentRow = [];
    for (let j = 0; j < 3; j++) {
      let color = (i + j) % 2 === 0 ? colorX : 200;
      let p = { h: color, s: 100, l: 50, o: 0.5 };
      currentRow.push(p);
    }
    grid1.push(currentRow);
    grid2.push(currentRow);
  }
  try {
    await db.sync({ force: true });
    for (let i = 0; i < 10; i++) {
      let hashVal = '';
      for (let i = 0; i < 12; i++)
        hashVal += hashString[Math.floor(Math.random() * hashString.length)];
      let newSprite = await Sprites.create({ hash: hashVal });
      let newFrame = await Frames.create({
        spriteId: newSprite.id,
        frameOrder: 1
      });
      await Layers.create({
        frameId: newFrame.id,
        pixels: JSON.stringify(grid1),
        layerOrder: 1
      });
      await Layers.create({
        frameId: newFrame.id,
        pixels: JSON.stringify(grid2),
        layerOrder: 2
      });
      let newFrame2 = await Frames.create({
        spriteId: newSprite.id,
        frameOrder: 2
      });
      await Layers.create({
        frameId: newFrame2.id,
        pixels: JSON.stringify(grid1),
        layerOrder: 1
      });
      await Layers.create({
        frameId: newFrame2.id,
        pixels: JSON.stringify(grid2),
        layerOrder: 2
      });
    }
    console.log('seeding sprites...');
  } catch (error) {
    console.log(error);
  }
}

seed();

module.exports = seed;
