 function shuffle(arr){
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
 }

 let arr = [1, 2, 3];
 
 console.log(shuffle(arr));

