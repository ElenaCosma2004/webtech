const dictionary = [
  "the",
  "quick",
  "brown",
  "fox",
  "jumps",
  "over",
  "the",
  "lazy",
  "dog",
];
const sampleText = `
best
read
on
windy
nights

`;

const checkAcrostih = (text, dictionary) => {
  const candidate = text
    .split("\n")
    .filter((e) => e)
    .map((e) => e.trim())
    .map((e) => e[0])
    .join("");
  return dictionary.indexOf(candidate) !== -1;
};
console.log(checkAcrostih(sampleText, dictionary));
