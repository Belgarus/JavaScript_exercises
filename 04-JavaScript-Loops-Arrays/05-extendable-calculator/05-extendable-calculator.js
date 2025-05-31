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

    let checkOp = this.methods.hasOwnProperty(op);
    let checkNumber = !isNaN(a) && !isNaN(b);

    if (checkOp &&  checkNumber == true){
        return this.methods[op](a, b);
    } else { return "something is not correct"}
    
    
  }

  this.addMethod = function(name, func) {
    this.methods[name] = func;
  };
}
