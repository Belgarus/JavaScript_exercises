class Node {
    constructor(value)
    {
        this.value = value;
        this.next = null;
    };
};

class LinkedList{
    constructor(value){
        this.head = null;
    };
    append(value){
        let newNode = new Node(value);
        if(!this.head){
            this.head = newNode;
            return;
        };
        let current = this.head;
        while(current.next){
            current = current.next;
        }
        current.next = newNode;
    }
};