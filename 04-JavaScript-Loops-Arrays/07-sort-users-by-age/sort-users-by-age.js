let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

let users = [ pete, john, mary ];

function compare(a, b){
    return a.age -b.age
} 

let sortByAge = users.sort(compare);



// now: [john, mary, pete]
console.log(users[0].name); // John
console.log(users[1].name); // Mary
console.log(users[2].name); // Pete