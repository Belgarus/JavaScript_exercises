class Node{
    constructor(data){
        this.data = data;
        this.next = null;
    }
}

class LinkedList{
    constructor(data){
        this.head = null;
    }
    append(data){
        let newNode = new Node(data);
        if(!this.head){
            this.head = newNode;
            return;
        }
        let current = this.head;
        while(current.next){
            current = current.next
        }
        current.next = newNode;
    }
    printList(){

    }
}

/*let head = new Node(1);
head.next = new Node(2);
head.next.next = new Node(3);
console.log(head.value, head.next.value, head.next.next.value); */
let list = new LinkedList();
list.append("uno")
console.log(list)