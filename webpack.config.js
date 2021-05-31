const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: {
      app: [
          './src/main.jsx',
      ],
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "assets")
  },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /\.test.(js|jsx)$/,
                include: [
					/src\/*/,
                    /node_modules/,
                  ],
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: [['@babel/plugin-proposal-decorators', { legacy: true }], ['@babel/plugin-proposal-class-properties', { loose: true }], '@babel/plugin-syntax-dynamic-import'],
                    },
                }],
            },
            {
              test: /\.(sa|sc|c)ss$/,
              use: [
                     {
                        loader: 'css-hot-loader'
                     },
                     {
                       loader: MiniCssExtractPlugin.loader
                     },
                     {
                       loader: 'css-loader',
                     },
                     {
                       loader: 'postcss-loader'
                     },
                     {
                       loader: 'sass-loader',
                       options: {
                         implementation: require("sass")
                       }
                     }
                   ]
            },
            {
                test: /\.(jpe?g|png|gif|svg|ico|woff|woff2|eot|ttf|xml|webmanifest)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                        publicPath: '/',
                    },
                }],
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.css', '.jpg'],
        alias: {
            style: path.resolve(__dirname, '/src/style/'),
            components: path.resolve(__dirname, './src/components/'),
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: `Fund Data`,
            description: 'Assignment #3',
            template: './src/index.html',
            inject: true,
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
        new MiniCssExtractPlugin({
          filename: "app.css"
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                },
            },
        },
    },
}
