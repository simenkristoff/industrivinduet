const webpack = require('webpack');
const { merge } = require('webpack-merge');
const dotenv = require('dotenv');

const common = require('./webpack.common.js');

const env = dotenv.config({ path: __dirname + './../.env.dev' }).parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);

  return prev;
}, {});

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    port: 3000,
    proxy: {},
  },
  plugins: [
    new webpack.DefinePlugin(envKeys),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
});
