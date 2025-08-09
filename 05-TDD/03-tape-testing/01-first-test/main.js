var test = require('tape').test;
var add = require('./functions');

test('The add method ', function(t){
    var actual = add(1, 2);
    var expected = 3;
    t.equal(actual, expected, 'shoud add two numbers correctly');
    t.end();
});