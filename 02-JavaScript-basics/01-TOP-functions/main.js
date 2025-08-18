let sum = (a, b) => a + b;

const arr = [12, 213, 21, 2, 189, 23, 190];

let arrFnc = arr.reduce((a, b) => a + b, 0);

console.log(arrFnc);

function bigestSum(Arr){
    let res = 0;
    for(let i = 0; i < Arr.length -1; i++){
        let sum = Arr[i] + Arr[i + 1];
        if(sum > res){res = sum};
    } return res;
}
console.log(bigestSum(arr))