const toBin = x => {
  let n = BigInt(x);
  if (n === 0n) return '0';
  let s = '';
  while (n) { s = (n % 2n).toString() + s; n /= 2n; }
  return s;
};

console.log(toBin(5987)); 
console.log("-----------")

const toBinSteps = x => {
  let n = BigInt(x);
  if (n === 0n) { console.log("0 / 2 = 0, R0\nBinär: 0"); return "0"; }
  const neg = n < 0n;
  if (neg) n = -n;
  const bits = [];
  while (n) {
    const q = n / 2n;
    const r = n % 2n;
    console.log(`${n} / 2 = ${q}, R${r}`);
    bits.push(r.toString());
    n = q;
  }
  const bin = bits.reverse().join('');
  console.log(`Binär: ${neg ? '-' : ''}${bin}`);
  return (neg ? '-' : '') + bin;
};
toBinSteps(5987);
console.log("-----------");