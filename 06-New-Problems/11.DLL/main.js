class Node {
    constructor(data){
        this.data = data;
        this.prev = null;
        this.next = null;
    }
}

class DoublyLinkedList{
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
    insertAtEnd(data){
        const newNode = new Node(data);
        if(!this.tail){
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        } this.length++;
    } 
    insertAtPosition(data, position){
        if(position < 0 || position > this.length){
            return false;
        }
        if(position === 0){
            this.insertAtBeginning(data);
            return true;
        }
        const newNode = new Node(data);
        let current = this.head;
        for (let i = 0; i < position - 1; i++){
            current  = current.next;
        }
        newNode.next = current.next;
        newNode.prev = current;
        current.next.prev = newNode;
        current.next = newNode;
        this.length++;
        return true;
    }
}