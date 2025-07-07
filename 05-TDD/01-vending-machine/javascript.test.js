  // This is what a simple unit test looks like:
      test('This sample test should always pass!', function(assert) {
        var result = 1 + 1;
        assert.equal(result, 2); // just so we know everything loaded ok
      });
      // A failing test will be RED:
      test('This is what a failing test looks like!', function(assert) {
        var result = [1,2,3].indexOf(1);  // this should be 0
        assert.equal(result, -1); // we *expect* this to fail
      });
      test("test getChange", function(assert){
        var result = 300 - 200
        assert.equal(result, 100)
    });