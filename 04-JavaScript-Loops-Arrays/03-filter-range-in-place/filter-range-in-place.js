function filterRangeInPlace(arr, a, b) {
    for(i = 0; i > arr.lenght; i++){
         if (arr[i] < a || arr[i] > b){
            arr.splice(arr[i])
         }
    }
}
let arr = [5, 3, 8, 1];
filterRangeInPlace(arr, 1, 4); // removed the numbers except from 1 to 4
console.log( arr ); // [3, 1]