const fs = require('fs');
const { renderVue } = require('hypernova-vue/server');
const hypernova = require('hypernova-lambda');
const { renderReactWithApollo } = require('./src/apollo/render');

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

// FIXME: demo only! Static content should be handled using storage or CDN service!
module.exports.script = async (event) => ({
  statusCode: 200,
  headers: {
    'Content-Type': 'application/javascript',
  },
  body: fs.readFileSync('dist/public/script.js').toString()
});

function renderComponent(renderFn, componentName) {
  return renderFn(
    componentName,
    require(`./src/${componentName}`).default
  );
}
