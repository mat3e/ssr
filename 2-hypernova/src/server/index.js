const express = require('express');
const Renderer = require('hypernova-client');

const renderer = new Renderer({
    url: 'http://localhost:9092/batch',
    plugins: [],
});

const app = express();
app.get('/', async (req, res) => {
    const jobs = {
        Hello: { 
            welcome: 'Siemanko'
         }
    };
    const rendered = await renderer.render(jobs);
    res.send(
        html(rendered)
    );
});
app.listen(9091, () => console.log('Started at 9091'));

function html(rendered) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>SSR - Hypernova</title>
        </head>
        <body>
            <div>${rendered}</div>
            <script src="http://localhost:9092/script.js"></script>
        </body>
        </html>
    `;
}