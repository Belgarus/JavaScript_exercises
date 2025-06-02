function getAverageAge(users){
  const userAge = users.map(user => (user.age));
  return userAge.reduce((acc, currentAge) => {
    return acc + currentAge;
  }, 0) / 3
}

let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 29 };

let arr = [ john, pete, mary ];

console.log(getAverageAge(arr) ); // (25 + 30 + 29) / 3 = 28