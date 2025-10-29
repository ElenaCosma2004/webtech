class EvenSequence {
  #current;
  constructor(startValue) {
    this.#current = startValue % 2 === 0 ? starValue : startValue + 1;
  }

  next() {
    this.#current = this.#current + 2;
    return this.#current;
  }
}

const seq = new EvenSequence(3);

for (let i = 0; i < 10; i++) {
  console.log(seq.next());
}
