function filterRange(arr, a, b) {
    let result = []
    arr.forEach(element => {
        if (element >= a && element <= b){
            result.push(element)
        }
    });
    return result
}

console.log(filterRange(['d', 'g', 'e', 'c'], 'a', 'd')); 