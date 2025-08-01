class Person {
    constructor(name, age){ 
            this.name = name;
            this.age = age;
    }
}

class Node {
    constructor(value){
        this.value = value;
        this.next = null;
    }
}

const p = new Person("Sheldon", 14)
const n = new Node(42)
console.log(p, n)