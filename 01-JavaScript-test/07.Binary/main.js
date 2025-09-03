const toBin = x => {
  let n = BigInt(x);
  if (n === 0n) return '0';
  let s = '';
  while (n) { s = (n % 2n).toString() + s; n /= 2n; }
  return s;
};

//console.log(toBin(5987)); 
//console.log("-----------");

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
//toBinSteps(5987);
console.log("-----------");

function hexToBin(hexString, { fullPad = false } = {}) {
  if (!hexString && hexString !== '0') throw new Error('Bitte Hex-String angeben');
  let s = String(hexString).trim().replace(/^0x/i, '');
  if (!/^[0-9a-fA-F]+$/.test(s)) throw new Error('Ungültiges Hex-Format');

  const parts = [];
  for (const ch of s) {
    const bits = parseInt(ch, 16).toString(2).padStart(4, '0');
    console.log(`${ch.toUpperCase()} -> ${bits}`);
    parts.push(bits);
  }

  const joined = parts.join('');
  const result = fullPad ? joined : joined.replace(/^0+(?=.)/, ''); // entferne führende Nullen, aber nicht alle
  console.log(`Binär: ${result}`);
  return result;
}

hexToBin("4FA1E")