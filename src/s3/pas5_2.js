const { Console } = require("console");

const increaseSalary = (salaries, percent) => {
  if (!Array.isArray(salaries)) {
    throw new Error("Salaries should be an array");
  }
  if (typeof percent !== "number") {
    throw new Error("percent should ne a number");
  }

  return salaries.map((salary) => {
    if (typeof salary !== "number") {
      throw new Error("All elements should be numbers");
    }
    return salary + (salary * percent) / 100;
  });
};
const salaries = [2000, 3000];
const newSalaries = increaseSalary(salaries, 15);
console.log(newSalaries);
