function renderPricesPage(prices) {
  const cards = prices
    .map(
      (p) => `
      <div class="card">
        <div class="name">${p.title}</div>
        <div class="value">${p.value || "N/A"}</div>
      </div>
    `,
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Gas Prices</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            margin: 0;
            padding: 0;
            background: #000;
            color: #fff;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            text-align: center;
          }
          .container {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 40px;
            padding: 20px;
            box-sizing: border-box;
          }
          .card {
            width: 100%;
          }
          .name {
            font-size: 1.8rem;
            font-weight: 400;
            color: #aaa;
            margin-bottom: 10px;
          }
          .value {
            font-size: 5rem;
            font-weight: 800;
            line-height: 1;
          }
          h1 {
            font-size: 1.2rem;
            color: #666;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 40px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          ${cards}
        </div>
      </body>
    </html>
  `;
}

module.exports = {
  renderPricesPage,
};
