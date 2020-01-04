const { resolve } = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const config = {
    entry: './examples/index.ts',

    output: {
        path: resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'app.js',
    },

    devServer: {
        contentBase: resolve(__dirname, 'public'),
        historyApiFallback: true,
        hot: true,
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                },
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/,
                use: [
                    'css-loader',
                ],
            },
        ],
    },

    resolve: {
        alias: {
            components: resolve(__dirname, 'src/components/'),
            views: resolve(__dirname, 'src/views/'),
        },
        extensions: ['.ts', '.js', '.vue', '.json'],
    },

    plugins: [
        new VueLoaderPlugin(),
    ],
};

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        config.devtool = 'source-map';
    }

    if (argv.mode === 'production') {
        config.devtool = 'none';
    }

    return config;
};
