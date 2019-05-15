module.exports = (pixels, change) => {
    change.map(cell => {
        pixels[cell.y][cell.x] = cell.color
    })
    return pixels
}


