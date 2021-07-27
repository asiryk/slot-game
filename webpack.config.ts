const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HTMLPlugin = require("html-webpack-plugin");
const IS_DEV_MODE = process.argv.reduce((acc, arg) => acc || arg.includes("development"), false);

const BUILD_PATH = path.resolve("build");

module.exports = {
  devtool: IS_DEV_MODE && "cheap-module-source-map",
  entry: "./src/index.ts",
  output: {
    path: BUILD_PATH,
    filename: "[name].[contenthash:8].js",
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: getLoaders(),
  },
  plugins: getPlugins(),
  devServer: {
    contentBase: BUILD_PATH,
    port: 4200,
    hot: true,
  },
  optimization: getOptimizations(),
};

function getOptimizations() {
  return {
    minimize: !IS_DEV_MODE,
    splitChunks: {
      chunks: "all",
    },
    runtimeChunk: {
      name: (entrypoint: any) => `runtime-${entrypoint.name}`,
    },
  };
}

function getLoaders() {
  return [
    {
      test: /\.tsx?$/,
      loader: "ts-loader",
      exclude: /node_modules/,
    },
  ];
}

function getPlugins() {
  return [
    new HTMLPlugin({ template: "./src/index.html" }),
    new CopyPlugin({
      patterns: [
        { from: "./src/public/", to: "public/" },
        { from: "./src/styles/", to: "styles/" },
        { from: "./src/assets/", to: "assets/" },
      ],
    }),
  ];
}
