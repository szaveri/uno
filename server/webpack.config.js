const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const config = {
  entry: {
    main: './src/index.ts',
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
          path.resolve(__dirname, 'src'),
        ],
      },
    ],
  },
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.js',
    ],
    plugins: [
      new TsconfigPathsPlugin({ configFile: './tsconfig.json', }),
    ],
  },
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.mode = 'development';
  }

  if (argv.mode === 'production') {
    config.mode = 'production';
    config.optimization = {
      minimizer: [
        new UglifyJsPlugin(),
      ],
    };
  }

  return config;
}
