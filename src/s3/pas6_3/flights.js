const fetch = require("node-fetch");

async function getObjectFromUrl(url) {
  const response = await fetch(url);
  const text = await response.text();
  return JSON.parse(text);
}

async function getCountryBounds(country) {
  const object = await getObjectFromUrl(
    `https://nominatim.openstreetmap.org/search?country=${country}&format=json`
  );
  return {
    minLatitude: object[0].boundingbox[0],
    maxLatitude: object[0].boundingbox[1],
    minLongitude: object[0].boundingbox[2],
    maxLongitude: object[0].boundingbox[3],
  };
}

async function getPlanesOverCountry(country) {
  const bounds = await getCountryBounds(country);

  const url = `https://opensky-network.org/api/states/all?lamin=${bounds.minLatitude}&lomin=${bounds.minLongitude}&lamax=${bounds.maxLatitude}&lomax=${bounds.maxLongitude}`;
  const data = await getObjectFromUrl(url);
  return data.states || [];
}

async function main() {
  const planes = await getPlanesOverCountry("Romania");

  console.log(`Sunt ${planes.length} avioane deasupra României.`);
  console.log("Exemple de avioane:");
  console.log(planes.slice(0, 20));
}
main();
