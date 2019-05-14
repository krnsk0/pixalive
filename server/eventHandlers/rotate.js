module.exports = function(arr){
    let outArr = []
    for (let i = 0; i < arr.length; i++){
    outArr.unshift(arr.map(x => x[i]))
    }
    return outArr
  }