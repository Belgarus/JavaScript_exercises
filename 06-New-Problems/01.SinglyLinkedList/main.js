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
        print(){
            let tempNode = this.head;
            let result = '';
            while(tempNode){
                if(tempNode.next === null){
                    result += tempNode.val + '--> Null'; 
                }else {
                    result += tempNode.val + '-->';
                }
                tempNode = tempNode.next;
            }
            console.log(result);
        }
 }

 const list = new LinkedList();
 list.insert('Sheldon'); //Sheldon is inserted as a new value
 list.insert('Leonard');
 list.insert('Howard')
 list.insert('Rajesh')
 list.print()