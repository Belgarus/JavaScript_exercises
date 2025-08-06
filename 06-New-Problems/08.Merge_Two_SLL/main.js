class Node {
  constructor(value) {
    this.value = value;
    this.next  = null;
  }
}
class LinkedList {
  constructor() {
    this.head = null;
  }
  append(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      return;
    }
    let cur = this.head;
    while (cur.next) {
      cur = cur.next;
    }
    cur.next = newNode;
  }
  printList() {
    let cur = this.head;
    let out = "";
    while (cur) {
      out += cur.value + " -> ";
      cur = cur.next;
    }
    console.log(out + "null");
  }
}

const list1 = new LinkedList();
[5, 10, 15, 40].forEach(v => list1.append(v));
console.log("List1:");
list1.printList(); 

const list2 = new LinkedList();
[2, 3, 20].forEach(v => list2.append(v));
console.log("List2:");
list2.printList();  

const head1 = list1.head;
const head2 = list2.head;
 
function sortedMerge(head1, head2){
    let arr = [];
    while(head1 !== null){
        arr.push(head1.value);
        head1 = head1.next;
    }
}