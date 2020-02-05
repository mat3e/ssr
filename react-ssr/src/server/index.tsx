import { renderToString } from 'react-dom/server';
import React from 'react';
import express from 'express';

import Hello from '../Hello';

const PORT: number = process.env.PORT ? +process.env.PORT : 9090;
const app = express();
app.use(express.static('dist/public'));
app.get('/*', (req: express.Request, res: express.Response) => res.send(
    html(
        renderToString(<Hello />)
    )
));
app.listen(PORT, () => console.log(`Started at ${PORT}`));

function html(renderedReact: string): string {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>SSR</title>
        </head>
        <body>
            <div id="root">${renderedReact}</div>
            <script src="script.js"></script>
        </body>
        </html>
    `;
}