String.prototype.capitalizeWords = function () {
  //pt toate aparitiile care au la stanga un boundry si sunt un caracter din secventa a-z
  return this.replace(/\b[a-z]/g, (match) => match.toUpperCase());
};
console.log("these words will be capitalized".capitalizeWords());
