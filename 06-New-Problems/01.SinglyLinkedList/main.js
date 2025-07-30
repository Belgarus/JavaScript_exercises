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
                
            }
        }
        isEmpty(){
            return this.head === null;
        }
 }

 const list = new LinkedList();
 list.insert('Scanlan'); //Scanlan is inserted as a new value
