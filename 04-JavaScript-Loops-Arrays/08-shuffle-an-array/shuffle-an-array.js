 function shuffle(arr){
    return arr
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
 }

 let arr = [1, 2, 3];
 
 console.log(shuffle(arr));

