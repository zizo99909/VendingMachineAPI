export function getChange(amount) {
    const coins = [100, 50, 20, 10, 5];
    const result = [];
  
    for (let coin of coins) {
      while (amount >= coin) {
        result.push(coin);
        amount -= coin;
      }
    }
    return result;
  }
  