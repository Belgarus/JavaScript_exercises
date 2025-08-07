// Doubly Linked list Node 
class Node {
    // Constructor to create a new node
    // next and prev is by default initialized as null
    constructor(val) {
        // To store the value
        this.data = val;
        // To link the next Node
        this.next = null;
        // TO link the previous Node
        this.prev = null;
    }
}

class DoublyLinkedList {
    constructor(){
        this.head = null;
        this.tail = null;
    }
    isEmpty(){
        if (this.head == null) return true;
        return false;
    }
    addItem(val){
        let temp = new Node(val);
        if (this.head == null){
            this.head = temp;
            this.tail = temp
        } else {
            this.tail.next = temp;
            this.tail = this.tail.next;
        }
    }
}