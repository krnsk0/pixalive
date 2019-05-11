const deepEqual = (a, b) => {
  for (let k in a){
    if (a === null || b === null){
      return a === b
    }
    if (a[k] !== b[k]){
      return false
    }
  }
  return true
}

module.exports = function paintCan(grid, x, y, selectedColor, currentColor, visited = {}) {
    let neighbors = [ 
        {x: -1, y: -1},
        {x: -1, y: 0}, 
        {x: -1, y: 1}, 
        {x: 0, y: -1},
        {x: 0, y: 0},
        {x: 0, y: 1}, 
        {x: 1, y: -1}, 
        {x:1, y: 0}, 
        {x: 1, y: 1}]


      
    let changeArr = [{x, y}]
    if (!visited[`${x}x${y}y`]){
      visited[`${x}x${y}y`] = true
      // if (x >=0 && y >= 0 && x < grid[0].length && y < grid.length){
      for (let i = 0; i < neighbors.length; i++){
        let c = neighbors[i]
        if (x + c.x >=0 && y + c.y >= 0 && x + c.x < grid[0].length && y + c.y < grid.length){
          if (deepEqual(grid[y + c.y][x + c.x], currentColor) && deepEqual(currentColor, grid[y + c.y][x + c.x])  && !visited[`${x + c.x}x${y + c.y}y`]){
            changeArr = changeArr.concat(paintCan(grid, x + c.x, y + c.y, selectedColor, currentColor, visited))
            // }
          } 
        }
      }
    }
  return changeArr
}