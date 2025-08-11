class Node {
    constructor(value){
        this.prev = null;
        this.next = null;
        this.value = value;
    }
}

class DoublyLinkedList{
    constructor(){
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    append(value){
        let newNode = new Node(value);
        if(!this.head){
            this.head = newNode;
            this.tail = newNode;
        }
    }
}