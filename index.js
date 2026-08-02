const express = require("express");
const { getPrices } = require("./scraper");
const { renderPricesPage } = require("./templates");

const app = express();
const PORT = process.env.PORT || 3000;

let cachedPrices = null;
let lastFetchTime = null;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

async function fetchPrices() {
  const now = Date.now();
  if (cachedPrices && lastFetchTime && now - lastFetchTime < CACHE_DURATION) {
    return cachedPrices;
  }

  const prices = await getPrices();
  cachedPrices = prices;
  lastFetchTime = now;
  return prices;
}

app.get("/", async (req, res) => {
  try {
    const prices = await fetchPrices();
    const html = renderPricesPage(prices);
    res.send(html);
  } catch (error) {
    res.status(500).send("<h1>Internal Server Error</h1>");
  }
});

app.get("/prices", async (req, res) => {
  try {
    const result = await fetchPrices();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
