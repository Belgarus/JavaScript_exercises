const arr = [12, 213, 21, 2, 189, 23, 190];
let newArr = arr.sort((a, b) => a - b);
let len = newArr.length;

console.log(newArr[len - 1] + newArr[len - 2]);