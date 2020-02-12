module.exports = {
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
    output: {
    },
    mode: 'development',
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'awesome-typescript-loader'
        }]
    }
};
