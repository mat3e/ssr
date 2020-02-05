const Renderer = require('hypernova-client');

const renderer = new Renderer({
  url: 'http://localhost:3000/batch',
  plugins: [],
});

module.exports.home = async (event) => {
  const name = 'Morty';
  const jobs = {
    Search: {
      input: name
    },
    Tiles: {
      name
    }
  };
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html'
    },
    body: html(await renderer.render(jobs))
  };
};

function html(rendered) {
  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>Serverless - Hypernova</title>
      </head>
      <body>
          ${rendered}
          <script src="http://localhost:3000/script"></script>
      </body>
      </html>
  `;
}