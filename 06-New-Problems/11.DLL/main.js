class Node {
    constructor(data){
        this.data = data;
        this.prev = null;
        this.next = null;
    }
}

class doublyLinkedList{
    constructor(){
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    insertAtBeginning(data){
        const newNode = new Node(data);
        if(!this.head){
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        } this.length++;
    }

}