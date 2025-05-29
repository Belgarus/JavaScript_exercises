function camelize(str) {
  return str
    .split('-') //'make-it-camelized' → ['make', 'it', 'camelized']
    .map((word, index) => index == 0 ? word : word[0].toUpperCase() + word.slice(1)) // ['make', 'it', 'camelized']  → ['make', 'It', 'Camelized'] 
    .join(''); // ['make', 'It', 'Camelized'] → 'makeItCamelized'
}

console.log(camelize("make-it-camelized")); // "makeItCamelized"