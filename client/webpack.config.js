const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const serverConfig = {
  mode: 'production',
  entry: {
    main: './react-server/src/index.ts',
  },
  output: {
    filename: 'server.js',
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
    ],
    plugins: [
      new TsconfigPathsPlugin({ configFile: './react-server/tsconfig.json', }),
    ],
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin(),
    ],
  },
}

const clientConfig = {
  mode: 'production',
  entry: {
    main: './src/index.tsx',
  },
  output: {
    filename: 'website.js',
    path: path.resolve(__dirname, 'dist/build'),
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
        include: [
          path.resolve(__dirname, 'src')
        ]
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'less-loader' },
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ],
  },
  resolve: {
    extensions: [
      '.ts',
      '.tsx',
      '.js',
      '.jsx',
    ],
    alias: {
      '@app': path.resolve(__dirname, 'src/'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@helpers': path.resolve(__dirname, 'src/helpers'),
      '@modules': path.resolve(__dirname, 'src/modules'),
    }
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
}

module.exports = [ clientConfig, serverConfig ];