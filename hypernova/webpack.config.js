const nodeExternals = require('webpack-node-externals');
const baseConfig = {
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    output: {
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'awesome-typescript-loader'
            }
        ]
    }
};
const backend = {
    target: 'node',
    externals: [
        nodeExternals()
    ]
}

module.exports = function (env) {
    switch (env.platform) {
        case 'server':
            return {
                ...baseConfig,
                ...backend,
                ...{
                    entry: './src/server/index.js',
                    output: {
                        filename: 'server.js'
                    }
                }
            }
        case 'web':
            return {
                ...baseConfig,
                ...{
                    entry: './src/client/index.tsx',
                    output: {
                        filename: 'public/script.js'
                    }
                }
            }
        case 'hypernova':
            return {
                ...baseConfig,
                ...backend,
                ...{
                    entry: './src/hypernova/index.js',
                    output: {
                        filename: 'hypernova.js'
                    }
                }
            }
    }
}