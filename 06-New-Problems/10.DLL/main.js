class Node{
    constructor(val){
        this.val = val;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList{
    constructor(){
        this.head = null;
        this.tail = null;
    }
    append(val) {
    let newNode = new Node(val);
    if (this.head === null) { 
        this.head = newNode;
        this.tail = newNode;
    } else {
        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
    }
} 
    printList(){
    let current = this.head;
    let res = ''
    while(this.head !== null){
        res += `${current.val} <-> `;
        current = current.next;
    } console.log(`${res}head`)
}
}
