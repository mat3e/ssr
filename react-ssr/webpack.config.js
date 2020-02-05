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

module.exports = function (env) {
    switch (env.platform) {
        case 'server':
            return {
                ...baseConfig,
                ...{
                    entry: './src/server/index.tsx',
                    output: {
                        filename: 'server.js'
                    },
                    target: 'node',
                    externals: [
                        nodeExternals()
                    ]
                }
            }
        case 'web':
            return {
                ...baseConfig,
                ...{
                    entry: './src/client/index.tsx',
                    output: {
                        filename: 'public/script.js',

                    }
                }
            }
    }
}