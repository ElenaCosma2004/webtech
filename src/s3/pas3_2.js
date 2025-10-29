function expGen() {
  const cache = {};

  const exp = (x, n) => {
    const key = `${x},${n}`;
    if (cache[key] !== undefined) {
      console.log("found " + key);
      return cache[key];
    }
    console.log("calculated " + key);
    let result;
    if (n === 0) {
      result = 1;
    } else {
      result = x + exp(x, n - 1);
    }
    cache[key] = result;
    return result;
  };
  return exp;
}

const exp = expGen();
console.log(exp(2, 1));
console.log(exp(2, 5));
console.log(exp(2, 3));
