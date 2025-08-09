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
        insertHead(val){
            let newNode = new ListNode(val);
            newNode.next = this.head;
            this.head = newNode;
        }
        insertAtIndex(val, index){
            let previusNode; 
            let currentNode = this.head;
            let indexCounter =  0;

            let newNode = new ListNode(val);

            while(indexCounter < index){
                previusNode = currentNode;
                currentNode = previusNode.next;
                indexCounter++;
            }
            previusNode.next = newNode;
            newNode.next = currentNode;
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
 list.insertHead('Amy')
 list.insertAtIndex('Bernadet', 3)
  list.insertAtIndex('Penny', 2)
 list.print()