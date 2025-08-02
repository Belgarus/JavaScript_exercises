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
        if(this.head = null){
            this.head = newNode();
            return;
        }

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