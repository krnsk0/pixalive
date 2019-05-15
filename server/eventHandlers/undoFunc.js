module.exports = (pixels, change) => {
    if (change && change.length){
        change.map(cell => {
            pixels[cell.y][cell.x] = cell.color
        })
        return pixels
    }
    else return undefined 
}


