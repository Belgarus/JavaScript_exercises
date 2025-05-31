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

    if (this.methods.hasOwnProperty(op) && !isNaN(a) && !isNaN(b)){
        return this.methods[op](a, b);
    } else { 
        return "something is not correct"
    }
  }

  this.addMethod = function(name, func) {
    this.methods[name] = func;
  };
}
