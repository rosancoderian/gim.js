let path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'gim.js',
    path: path.resolve(__dirname, 'dist')
  }
};
