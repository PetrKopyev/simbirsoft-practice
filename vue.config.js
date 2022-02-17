const path = require('path');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/simbirsoft-practice/'
    : '/',
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'));
  },
};
