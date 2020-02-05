const fs = require('fs');
const { renderVue } = require('hypernova-vue/server');
const hypernova = require('hypernova-lambda');
const { renderReactWithApollo } = require('./src/apollo/render');

module.exports.script = async (event) => ({
  statusCode: 200,
  headers: {
    'Content-Type': 'application/javascript',
  },
  body: fs.readFileSync('dist/public/script.js').toString()
});

module.exports.batch = (event, context, callback) => {
  hypernova(
    event,
    {
      getComponent(name) {
        switch (name) {
          case 'Tiles':
            return renderComponent(renderReactWithApollo, name);
          case 'Search':
            return renderComponent(renderVue, name);
          default:
            return null;
        }
      }
    },
    callback
  );
};

function renderComponent(renderFn, componentName) {
  return renderFn(
    componentName,
    require(`./src/${componentName}`).default
  );
}
