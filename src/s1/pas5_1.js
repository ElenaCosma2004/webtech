function addToArray(array, ...args) {
  for (let i = 0; i < args.length; i++) {
    array.push(args[i]);
  }
  return array;
}

let array = ["a"];

console.log(addToArray(array, "b", "c").join(", "));
