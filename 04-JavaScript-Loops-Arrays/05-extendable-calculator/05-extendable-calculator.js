function Calculator() {
  this.methods = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b
  };

  this.calculate = function(str) {
    // hier: parse 'str' und muss this.methods[op] benutzen
  };

  this.addMethod = function(name, func) {
    this.methods[name] = func;
  };
}
