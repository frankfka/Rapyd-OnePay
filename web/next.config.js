const withTM = require('next-transpile-modules')(['lowdb']);

module.exports = withTM({
  future: {
    webpack5: true,
  },
});
