function occurences(text, character) {
  let count = 0;
  for (let i = 0; i < text.length; i++) {
    if (text.charAt(i) === character) {
      count++;
    }
  }
  return count;
}

console.log(occurences("sample text", "e"));

// sau let occurences = (text, character) => text.split(character).length - 1;
