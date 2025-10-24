const formatString = (template, params) => {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    return key in params ? params[key] : match;
  });
};
console.log(
  formatString("un {substantiv} este {adjectiv}", {
    substantiv: "căluț",
    adjectiv: "drăguț",
  })
);
