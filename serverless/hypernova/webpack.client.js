const baseConfig = require('./webpack.base');
module.exports = {
    ...baseConfig,
    ...{
        mode: 'production',
        entry: './src/client/index.tsx',
        output: {
            filename: 'public/script.js'
        }
    }
}