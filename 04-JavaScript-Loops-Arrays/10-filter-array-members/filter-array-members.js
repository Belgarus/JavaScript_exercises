function unique(arr) {
 return arr.filter((element, index) =>  arr.indexOf(element) === index)
}

let strings = ["Hare", "Krishna", "Hare", "Krishna",
  "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

console.log( unique(strings) ); // Hare, Krishna, :-O