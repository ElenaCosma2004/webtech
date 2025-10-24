const cenzureaza = (text, dictionar) => {
  const cuvinte = text.split(" ");
  const rezultat = cuvinte.map((cuvant) => {
    const gasit = dictionar.find(
      (d) => d.toLowerCase() === cuvant.toLowerCase()
    );

    if (gasit) {
      if (cuvant.length > 2) {
        return (
          cuvant[0] + "*".repeat(cuvant.length - 2) + cuvant[cuvant.length - 1]
        );
      } else {
        return "*".repeat(cuvant.length);
      }
    }
    return cuvant;
  });

  return rezultat.join(" ");
};
console.log(cenzureaza("javascript este minunat", ["este"]));
