const webpack = require('webpack');
const path = require('path');
const loaders = require('./webpack.loaders');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || '3000';


const devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false')),
});

// global css
loaders.push({
  test: /[\/\\](node_modules|global)[\/\\].*\.css$/,
  loader: 'style-loader!css-loader!postcss-loader',
});
// local css modules
loaders.push({
  test: /[\/\\]src[\/\\].*\.css/,
  exclude: /(node_modules|bower_components|public)/,
  loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader',
});

module.exports = {
  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://${HOST}:${PORT}`,
    'webpack/hot/only-dev-server',
    './src/index.js',
  ],
  devtool: process.env.WEBPACK_DEVTOOL || 'cheap-module-source-map',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/',
    sourceMapFilename: '[name].js.map',
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  module: {
    loaders,
  },
  devServer: {
    contentBase: './build',
    noInfo: true,
    hot: true,
    inline: true,
    historyApiFallback: true,
    compress: true,
    port: PORT,
    host: HOST,
  },

  plugins: [
    // new BundleAnalyzerPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    devFlagPlugin,
  ],
};
