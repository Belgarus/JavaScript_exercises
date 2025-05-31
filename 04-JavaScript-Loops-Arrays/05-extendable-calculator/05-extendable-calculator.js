function Calculator() {
  this.methods = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b
  };

  this.calculate = function(str) {
    let parts = str.split(" ")
    let a = parseFloat(parts[0])
    let b = parseFloat(parts[2])
    let op = parts[1]

    return this.methods[op](a, b);
  }

  this.addMethod = function(name, func) {
    this.methods[name] = func;
  };
}
