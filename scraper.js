const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeValue(url, selector, attribute = null) {
  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const $ = cheerio.load(response.data);
    const element = $(selector).first();

    if (!element.length) {
      return null;
    }

    if (attribute) {
      return element.attr(attribute) ?? null;
    }

    return element.text().trim();
  } catch (err) {
    console.error(err.message);
    return null;
  }
}

async function getPrices() {
  // Auchan Soroksar
  const price1 = await scrapeValue(
    "https://holtankoljak.hu/auchan_budapest_xxiii_1004",
    ".d-flex.mb-3:first-child span.ar",
  );

  // Shell Tesco
  const price2 = await scrapeValue(
    "https://holtankoljak.hu/shell_budapest_xx_2043",
    ".d-flex.mb-3:first-child span.ar",
  );

  return [
    { title: "Auchan Soroksar", value: price1 },
    { title: "Shell Tesco", value: price2 },
  ];
}

module.exports = {
  getPrices,
  scrapeValue,
};
