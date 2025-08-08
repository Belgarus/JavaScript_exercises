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
    while(current !== null){
        res += `${current.val} <-> `;
        current = current.next;
    } console.log(`${res}null`)
}
}

list = new DoublyLinkedList()
list.append('Sheldon Cooper');
list.append('Jim Parsons');
list.append('Leonard Hofstadter');
list.append('Johnny Galecki');
list.printList()
