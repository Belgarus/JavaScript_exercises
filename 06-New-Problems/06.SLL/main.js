class Node {
    constructor(value){
        this.value = value;
        this.next = null;
    }
}

class LinkedList{
    constructor(value){
        this.head = null;
    }
    append(value){
        let newNode = new Node(value);
        let current = this.head;
        if(this.head === null){
            this.head = newNode;
            newNode.next = null
            return;
        }
    }
}

let list = new LinkedList;
list.append("1")
console.log(list)