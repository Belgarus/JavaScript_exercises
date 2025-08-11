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
    print(value){
        let current = this.head;
        let res = 'head -> ';
        while(current){
            res += `${current.value} <->`;
            current = current.next;
        } console.log(`${res} null`)
    }
}

let list = new DoublyLinkedList();
list.append(1);
list.print();