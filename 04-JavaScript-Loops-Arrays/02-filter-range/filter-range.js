function filterRange(arr, a, b) {
    return arr.filter(item => (a <= item && item <= b));
}

console.log(filterRange(['d', 'g', 'e', 'c'], 'a', 'd')); 