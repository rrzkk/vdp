const path = require('path');


const nodeExternals = require('webpack-node-externals');



module.exports = {
  
  entry: {
    app: './src/index.ts',
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  node:{
    fs:'empty',
    net:'empty'
  },

  externals: [ nodeExternals() ],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://localhost:8080/'
  },
};