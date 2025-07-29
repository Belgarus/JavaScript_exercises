class HashMap {
    constructor(tablesize = 16){
        this.table = new Array(this.tablesize);
        this.tableSize = tablesize;
    } 

hash(key) {
    let hashValue = 0;
    for (let i = 0; i < key.length; i++){
        hashValue = (hashValue+ key.charCodeAt(i)* i % this.tableSize);
    } return hashValue
};

set(key, value){
    const index= this.hash(key);
    this.table[index] = value;
}};