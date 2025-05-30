function filterRangeInPlace(arr, a, b) {
    for(i = 0; i < arr.lenght; i++){
        let val = arr[i];
         if (val < a || val > b){ // remove if outside of the interval
            arr.splice(i, 1);
            i--;
         }
    }
}

let arr = [5, 3, 8, 1];
filterRangeInPlace(arr, 1, 4); // removed the numbers except from 1 to 4
console.log( arr ); // [3, 1]