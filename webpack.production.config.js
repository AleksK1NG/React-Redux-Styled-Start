const webpack = require('webpack');
const path = require('path');
const loaders = require('./webpack.loaders');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// local css modules
loaders.push({
  test: /[\/\\]src[\/\\].*\.css$/,
  exclude: /(node_modules|bower_components|public)/,
  loader: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader',
  }),
});
// global css files
loaders.push({
  test: /[\/\\](node_modules|global)[\/\\].*\.css$/,
  loader: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: 'css-loader?importLoaders=1!postcss-loader',
  }),
});

module.exports = {
  entry: {
    app: './src/index.js',
    vendors: [
      'react',
      'react-dom',
      'redux',
      'react-redux',
      'redux-thunk',
      'react-router',
    ],
  },
  output: {
    publicPath: '/',
    path: path.join(__dirname, 'build'),
    filename: '[chunkhash].js',
    chunkFilename: '[chunkhash].js',
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.css', '.json'],
  },
  module: {
    loaders,
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new WebpackCleanupPlugin(),
    new ManifestPlugin(),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),

    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      minimize: true,
      compress: {
        warnings: false,
        screw_ie8: false,
        drop_console: true,
        drop_debugger: true,
        sequences: true,
        booleans: true,
        loops: true,
        unused: true,
        unsafe: true,
      },
    }),
    new webpack.optimize.AggressiveMergingPlugin({
      minSize: 30000,
      maxSize: 50000,
      minSizeReduce: 1.5,
      moveToParents: true,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: '[name].[hash].js',
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          require('postcss-smart-import')({ /* ...options */ }),
          require('precss')({ /* ...options */ }),
          require('autoprefixer')({
            browserslist: [
              '> 5%',
            ],
          }),
        ],
      },
    }),
    new ExtractTextPlugin({
      filename: '[contenthash].css',
      disable: false,
      allChunks: true,
    }),

    new HtmlWebpackPlugin({
      template: './index.html',
    }),

    new webpack.optimize.AggressiveMergingPlugin({
      minSizeReduce: 1,
      moveToParents: true,
      entryChunkMultiplicator: 10,
    }),

    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),

    new CopyWebpackPlugin([{ from: 'static' }]),

  ],
};
