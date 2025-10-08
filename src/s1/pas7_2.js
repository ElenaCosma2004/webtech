const letterFreq = (text) => {
  const letterText = text
    .toLowerCase()
    .split("")
    .filter((ch) => ch !== " ");

  const result = {};
  for (let char of letterText) {
    if (char in result) {
      result[char]++;
    } else result[char] = 1;
  }
  for (let char in result) {
    result[char] = result[char] / letterText.length;
  }
  return result;
};

console.log(letterFreq("Ana are mere"));
