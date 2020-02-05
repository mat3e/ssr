const hypernova = require('hypernova/server');
const { renderReact } = require('hypernova-react');
const express = require('express');

hypernova({
    devMode: true,
    getComponent(name) { // could be `getComponent: require`
        switch (name) {
            case 'Hello':
                return renderReact(
                    name,
                    require('../Hello').default // default export
                );
            default:
                return null;
        }
    },
    createApplication() {
        const app = express();
        // cors
        app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            next();
        });
        app.use(express.static('dist/public'));
        return app;
    },
    port: 9092
});