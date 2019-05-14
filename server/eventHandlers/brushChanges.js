const constants = require('../../shared/constants')
const cloneDeep = require('lodash')


const coordMaker = (num, x, y) =>{
    let arr = []
    for (let i = 0; i < num; i++){
        for(let j = 0; j < num; j++){
            arr.push({x: x-Math.floor(num/2) + i, y: y-Math.floor(num/2) + j})
        }
    }
    return arr
  }

module.exports = (brushType, x, y, layerToDraw) => {
    let field 
    if (brushType === constants.TOOLS.BRUSH_16){
        field = coordMaker(2, x, y)
    }
    else if (brushType === constants.TOOLS.BRUSH_32){
        field = coordMaker(4, x, y)
    }
    else if (brushType === constants.TOOLS.BRUSH_48){
        field = coordMaker(6, x, y)
    }
    else if (brushType === constants.TOOLS.BRUSH_64){
        field = coordMaker(8, x, y)
    }
    console.log(field.length)
    return field.filter(a => a.x >= 0 && a. y >= 0 & a.x < layerToDraw.length && a.y < layerToDraw.length)
}

