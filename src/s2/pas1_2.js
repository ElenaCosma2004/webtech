const years = [2004, 2009, 2000, 1998, 2017, 2001];

const currentYear = 2025;

const filterYears = (years) => {
  const ages = years.map((year) => currentYear - year);
  const adultAges = ages.filter((age) => age > 18);
  return adultAges;
};
console.log(filterYears(years));
