const fibonacci = (n) => {
  if (n < 0) return undefined;
  if (n === 0) return 0;
  if (n === 1) return 1;

  let a = 0,
    b = 1;
  for (let i = 2; i <= n; i++) {
    const temp = a + b;
    a = b;
    b = temp;
  }
  return b;
};

if (process.argv.length < 3) {
  console.log("not enough params");
} else {
  const n = parseInt(process.argv[2]);
  console.log(fibonacci(n));
}
