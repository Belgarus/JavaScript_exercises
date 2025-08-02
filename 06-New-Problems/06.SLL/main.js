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
        const newNode = new Node(value);
        if(this.head === null){
            this.head = newNode;
            return;
        }
        let current = this.head;
        while(current.next !== null){
            current = current.next;
        } 
        current.next = newNode;
        return;
    }
}

let list = new LinkedList;
list.append("1")
list.append("2")
list.append("3")
list.append("4")
console.log(list)