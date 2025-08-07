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