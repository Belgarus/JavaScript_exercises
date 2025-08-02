class Node {
    constructor(val){
        this.val = val;
        this.next = null;
    }
}

class LinkedList{
    constructor(val){
        this.head = null;
    }
    prepend(val){
        const newNode = new Node(val)
        let current = this.head
        if(this.head === null){
            this.head = newNode;
            return;
        }  
        this.head = newNode
        newNode.next = current;
    }
    append(val){
        const newNode = new Node(val);
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
    insertAtIndex(val, i){
            let prev; 
            let current = this.head;
            let indexCounter =  0;

            let newNode = new Node(val);

            while(indexCounter < i){
                prev = current;
                current = prev.next;
                indexCounter++;
            }
            prev.next = newNode;
            newNode.next = current;
        }
    delete(val){
        let prev = null;
        let current = this.head;
        if(this.head == null){
            return console.log('List is empty. No item to delete.')
        } 
        while(current.val !== val){
            prev = current;
            current = current.next;
            if (current.next == null){
                return console.log(`Item ${val} is not found in the list.`)
            } 
        } prev.next = current.next
    }
    find(val){
        let i = 1;
        let current = this.head;
        if(this.head == val){
            return console.log(`${val} exists`)
        }
        while(current.val !== val){
            current = current.next;
            i++;
        } return console.log(`The value ${val} exists at index ${i}.`)
    }
    printList(){
        let result = '';
        let current = this.head;
        if(this.head === null){
            return console.log('List is empty.');
        }
        while(current !== null){
            result += `${current.val} -> `;
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
list.prepend("0.5")
list.delete("3")
list.find("0.5")
list.insertAtIndex("123", 3)
list.printList()