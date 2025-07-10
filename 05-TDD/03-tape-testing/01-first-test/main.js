var test = require('tape').test;
var add = require('./functions');

test('add: shoud add two numbers correctly', function(t){
    var actual = add(1, 2);
    var expected = 3;
    t.equal(actual, expected);
    t.end();
});