function getAverageAge(users){
  return users.reduce((acc, currentAge) => acc + currentAge.age, 0) / users.length
}

let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 29 };

let arr = [ john, pete, mary ];

console.log(getAverageAge(arr) ); // (25 + 30 + 29) / 3 = 28