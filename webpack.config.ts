const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HTMLPlugin = require('html-webpack-plugin');
const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[hash].js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(js|ts)$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLPlugin({template: './src/index.html'}),
    new CopyPlugin({
      patterns: [
        {from: './src/public/', to: 'public/'},
        {from: './src/styles/', to: 'styles/'},
        {from: './src/assets/', to: 'assets/'},
      ],
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    port: 4200,
    hot: true,
  },
  optimization: {
    minimize: !isDev,
    splitChunks: {
      chunks: 'all',
    },
  },
};
