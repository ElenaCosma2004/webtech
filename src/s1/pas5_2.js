const interArrays = (arr1, arr2) => {
  const result = [];
  for (let i = 0; i < arr1.length; i++) {
    result.push(arr1[i], arr2[i]);
  }
  return result;
};

console.log(interArrays([1, 2, 3], ["a", "b", "c"]));
