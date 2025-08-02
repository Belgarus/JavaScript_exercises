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
    delete(data){
        let current = this.head;
        let before = null;
        if(!this.head){
            return console.log("List is empty.")
        }
        while(current && current.data !== data){
            before = current;
            current = current.next;
            if(current.next === null){
                return console.log(`Item ${data} not found`)
            }
        } before.next = current.next;
    
    }
    printList(data){
         let result = ""
         if(this.head === null){
            console.log("The list is empty.");
            return;
        }
        let current = this.head
        while(current !== null){
            result += `${current.data} -> `;
            current = current.next;
        }
        return console.log(result + "null");
    }
}

/*let head = new Node(1);
head.next = new Node(2);
head.next.next = new Node(3);
console.log(head.value, head.next.value, head.next.next.value); */
let list = new LinkedList();
list.append("uno");
list.append("2");
list.append("🌳");
list.append("Four");
list.delete("2");
list.delete("Fou");
list.printList();