function camelize(str) {
    return str
        .replace(/[-_]/g, ' ')
        .split(' ')
        .map((word, index) => {
            if (index === 0) {
                return word.toLowerCase();
            }
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join('');
}

console.log(camelize("hello world")); // "helloWorld"
console.log(camelize("make-it-camelized")); // "makeItCamelized"