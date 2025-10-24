//implementați o funcție care primește ca parametrii un array de numere și un număr și returnează suma tuturor numerelor din array divizibile cu cel de-al doilea parametru.

const getTotal = (array, number) => {
  const divisible = array.filter((num) => num % number == 0);
  const sum = divisible.reduce((prev, current) => prev + current, 0);

  return sum;
};

const array = [2, 4, 5, 66, 7, 12, 15];
const number = 2;
const result = getTotal(array, number);
console.log("result: ", result);
