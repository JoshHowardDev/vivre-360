const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/index.tsx',
  output: {
    path: path.resolve(__dirname, '/dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './client/index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /.(jsx|js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /.(tsx|ts)?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg|ico)$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 8192 },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    fallback: {
      async_hooks: false,
      zlib: false,
      querystring: false,
      path: false,
      crypto: false,
      fs: false,
      stream: false,
      http: false,
      net: false,
      url: false,
      buffer: false,
      util: false,
    },
  },
  devServer: {
    host: 'localhost',
    port: 8080,
    hot: true,
    historyApiFallback: true,

    static: {
      directory: path.resolve(__dirname, 'dist'),
      publicPath: '/',
    },
    headers: { 'Access-Control-Allow-Origin': '*' },
    proxy: {
      '/api/**': {
        target: 'http://localhost:3000/',
        secure: false,
      },
      '/assets/**': {
        target: 'http://localhost:3000/',
        secure: false,
      },
    },
  },
};
