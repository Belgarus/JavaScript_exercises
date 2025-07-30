 class ListNode{
    constructor(val){
        this.val = val;
        this.next = null; 
    }
 }
 class LinkedList {
        head = null;
        insert(val){
            if(this.head === null){
                 this.head = new ListNode(val);
            } else {
                this.insertEnd(val);
            }
        }
        insertEnd(val){
            let newNode = new ListNode(val);
            let tempNode = this.head;
            while(tempNode.next){//true until null -> false
                    tempNode = tempNode.next;
            }
            tempNode.next = newNode;
        }
        isEmpty(){
            return this.head === null;
        }
 }

 const list = new LinkedList();
 list.insert('Scanlan'); //Scanlan is inserted as a new value
