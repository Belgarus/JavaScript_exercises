let john = { name: "John", surname: "Smith", id: 1 };
let pete = { name: "Pete", surname: "Hunt", id: 2 };
let mary = { name: "Mary", surname: "Key", id: 3 };

function fullname(arr){
 return arr.name + " " + arr.surname;
}

let usersMapped = [
    { fullname: fullname(john), id: john.id },
    { fullname: fullname(pete), id: pete.id },
    { fullname: fullname(mary), id: mary.id }
]

console.log(usersMapped)