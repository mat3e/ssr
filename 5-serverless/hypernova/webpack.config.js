const baseConfig = require('./webpack.base');
const slsw = require('serverless-webpack');
module.exports = {
    ...baseConfig,
    ...{
        target: 'node',
        entry: slsw.lib.entries,
        mode: slsw.lib.webpack.isLocal ? 'development' : 'production'
    }
}
