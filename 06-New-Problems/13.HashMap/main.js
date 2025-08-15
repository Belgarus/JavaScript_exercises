const hashMap = new Map();

hashMap.set('name', 'john');
hashMap.set('age', 42);

const name = hashMap.get('name');
console.log(name);

const hasName = hashMap.has('age');
console.log(hasName);

hashMap.delete('age');
console.log(hashMap.size);
