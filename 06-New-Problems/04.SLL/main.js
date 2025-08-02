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
            const newNode = new Node(data);
            if(this.head  === null){
                this.head = newNode;
                return;
            }
            let current = this.head;
            while(current.next !== null){
                current = current.next
            }
            current.next = newNode;
            return;
        }
    printList(){
         if(!this.head){
            return "The list is empty."
        } 
    }
}

/*let head = new Node(1);
head.next = new Node(2);
head.next.next = new Node(3);
console.log(head.value, head.next.value, head.next.next.value); */
let list = new LinkedList();
list.append("uno")
list.append("2")
console.log(list)