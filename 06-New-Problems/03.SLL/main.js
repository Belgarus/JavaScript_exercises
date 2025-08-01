class Node { 
    constructor(value) // Ist die Funktion, die aufgerufen wird, wenn man new Node(someValue) schreibt.
    {
        this.value = value; // Speichert den übergebenen Wert (z. B. eine Zahl, einen String oder ein Objekt) im neuen Knoten.
        this.next = null; // Legt den Zeiger auf den nächsten Knoten auf null, weil beim Erstellen eines neuen Einzelknotens noch nicht feststeht, wer „danach“ kommt.
    };
};

class LinkedList{

    constructor(value){
        // 'head' hält den Verweis auf den ersten Knoten der Liste.
        // Solange die Liste leer ist, ist head = null.
        this.head = null;
    };

    append(value){ // Fügt am Ende der Liste ein neues Element hinzu.
        // Erzeuge einen neuen Knoten mit deinem Wert
        let newNode = new Node(value);

        // Fall A: Liste ist noch leer → newNode wird zum head
        if(!this.head){
            this.head = newNode;
            return;
        };

        // Fall B: Liste ist nicht leer → finde das Ende
        let current = this.head;
        // So lange 'current.next' existiert, gehe weiter
        while(current.next){
            current = current.next;
        }
        // Jetzt ist current der letzte Knoten (current.next === null)
        // Hänge deinen neuen Knoten ans Ende
        current.next = newNode;
    }

    printList(){ // Gibt die gesamte Liste in der Konsole aus.
        let current = this.head;
        let result = "";

        while(current){ // Traversiere die Liste von head bis null
            // Füge den aktuellen Wert ans Ergebnis-String an
            result += current.value+"->";
            current = current.next;
        };
        // Am Ende steht 'null' als Abschluss
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