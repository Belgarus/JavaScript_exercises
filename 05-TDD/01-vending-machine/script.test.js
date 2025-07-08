test("test getChange", function(assert){
      var result = getChange(215, 300);
      assert.deepEqual(result, [50, 20, 10, 5]);
});

test('getChange(1,1) should equal [] - an empty array', function(assert) {
  var result = getChange(1, 1); //no change/coins just an empty array
  var expected = [];
  assert.deepEqual(result, expected);
}); // use deepEqual for arrays see: https://api.qunitjs.com/deepEqual/