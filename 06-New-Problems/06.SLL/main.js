class Node {
    constructor(value){
        this.value = value;
        this.next = null;
    }
}

class LinkedList{
    constructor(value){
        this.head = null;
    }
    append(value){
        const newNode = new Node(value);
        let current = this.head;
        if(this.head === null){
            this.head = newNode;
            return;
        }  
        while(current.next !== null){
            current = current.next;
        } 
        current.next = newNode;
        return;
    }
    printList(){
        let result = '';
        let current = this.head;
        if(this.head === null){
            return console.log('List is empty.');
        }
        while(current !== null){
            result += `${current.value} -> `;
            current = current.next;
        }
        return console.log(result + 'null');
    }
}

let list = new LinkedList;
list.append("1")
list.append("2")
list.append("3")
list.append("4")
list.printList()