const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    main: './react-server/src/index.ts',
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
  },
  target: 'node',
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false, // if you don't put this is, __dirname
    __filename: false, // and __filename return blank or /
  },
  devtool: 'inline-source-map',
  externals: [
    nodeExternals(),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, 'react-server/src'),
        ],
      },
    ],
  },
  resolve: {
    extensions: [
      '.ts',
      '.js',
    ]
  },
  plugins: [
    new TsconfigPathsPlugin({ configFile: './react-server/tsconfig.json', }),
    new CopyPlugin({
      patterns: [
        { from: 'build', to: 'build' },
      ],
    }),
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin(),
    ],
  },
};