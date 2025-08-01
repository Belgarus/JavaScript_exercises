class Node { 
    constructor(value) //Ist die Funktion, die aufgerufen wird, wenn man new Node(someValue) schreibt.
    {
        this.value = value; //speichert den übergebenen Wert (z. B. eine Zahl, einen String oder ein Objekt) im neuen Knoten.
        this.next = null; //Legt den Zeiger auf den nächsten Knoten auf null, weil beim Erstellen eines neuen Einzelknotens noch nicht feststeht, wer „danach“ kommt.
    };
};

class LinkedList{
    constructor(value){
        this.head = null;
    };
    append(value){
        let newNode = new Node(value);
        if(!this.head){
            this.head = newNode;
            return;
        };
        let current = this.head;
        while(current.next){
            current = current.next;
        }
        current.next = newNode;
    }
    printList(){
        let current = this.head;
        let result = "";
        while(current){
            result += current.value+"->";
            current = current.next;
        };
        console.log(result+"null")
    };
    delete(value){
        if(!this.head){
            console.log("list is empty no element to delete");
            return;
        };
        if(this.head.value === value){
            this.head = this.head.next;
            return;
        };
        let prev = null;
        let current = this.head;
        while(current && current.value !== value){
            prev = current;
            current = current.next;
        }
        if (!current){
            console.log("value is not found in list");
            return;
        }
        prev.next = current.next;
    };
};

let list = new LinkedList();
list.append("Kirk");
list.append("Spock");
list.append("McCoy");
list.append("Scotty");
list.delete("Scotty");
list.printList();