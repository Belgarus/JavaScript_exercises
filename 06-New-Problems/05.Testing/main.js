class Person {
    constructor(name, age){ 
            this.name = name;
            this.age = age;
    }
}
function Person2(name, age) {
  this.name = name;
  this.age  = age;
}

class Node {
    constructor(value){
        this.value = value;
        this.next = null;
    }
}

const p = new Person("Sheldon", 14)
const p2 = new Person2("Leonard", 14)
const n = new Node(42)
console.log(p, p2, n)

function Foo(bar) {
  console.log(this);      // => das frisch erzeugte obj
  this.bar = bar;
}
const f = new Foo(123);
console.log(f.bar); 

let head = new Node(4);
head.next = new Node(5);
head.next.next = new Node(6);
console.log(head.value + head.next.value + head.next.next.value);
