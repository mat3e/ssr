const { renderVue } = require('hypernova-vue/server');
const hypernova = require('hypernova/server');
const { renderReactWithApollo } = require('../apollo/render');
const express = require('express');

hypernova({
    devMode: true,
    getComponent(name) {
        switch (name) {
            case 'Tiles':
                return renderComponent(renderReactWithApollo, name);
            case 'Search':
                return renderComponent(renderVue, name);
            default:
                return null;
        }
    },
    createApplication() {
        const app = express();
        app.use(express.static('dist/public'));
        // cors
        app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            next();
        });
        return app;
    },
    port: 9092
});

function renderComponent(renderFn, componentName) {
    return renderFn(
        componentName,
        require(`../${componentName}`).default
    );
}