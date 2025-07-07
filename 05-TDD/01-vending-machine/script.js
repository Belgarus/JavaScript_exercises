function getChange(totalPayable, cashPaid) {
  const COINS = [1000, 500, 200, 100, 50, 20, 10, 5, 2, 1];
  if (cashPaid < totalPayable) {
    return "Insert more money.";
  }
  let change = [];
  let remaining = cashPaid - totalPayable;
  for (let i = 0; i < COINS.length; i++) {
    while (remaining >= COINS[i]) {
      change.push(COINS[i]);
      remaining -= COINS[i];
    }
  }
  return change;
}
