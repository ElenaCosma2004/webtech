const sorteazaDupaCheie = (array, cheie) => {
  return array.sort((a, b) => {
    if (a[cheie] < b[cheie]) return -1;
    if (a[cheie] > b[cheie]) return 1;
    return 0;
  });
};

const persoane = [
  { nume: "Ana", varsta: 25 },
  { nume: "Bogdan", varsta: 19 },
  { nume: "Cristina", varsta: 31 },
];

console.log("Sortare după nume:");
console.log(sorteazaDupaCheie(persoane, "nume"));

console.log("Sortare după vârstă:");
console.log(sorteazaDupaCheie(persoane, "varsta"));
