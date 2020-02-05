const express = require('express');
const Renderer = require('hypernova-client');

const renderer = new Renderer({
    url: 'http://localhost:9092/batch',
    plugins: [],
});

const app = express();
app.get('/', async (req, res) => {
    const name = 'Morty';
    const jobs = {
        Search: {
            input: name
        },
        Tiles: {
            name
        }
    };
    res.send(
        html(await renderer.render(jobs))
    );
});
app.use(async (req, res) => {
    const jobs = {
        Tiles: {
        }
    };
    res.status(404);
    res.send(
        html('Not Found<br>' + await renderer.render(jobs))
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
            ${rendered}
            <script src="http://localhost:9092/script.js"></script>
        </body>
        </html>
    `;
}