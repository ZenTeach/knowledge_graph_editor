module.exports = {
  configureWebpack: {
    entry: {
      app: "./src/main.js"
    },
    resolve: {
      alias: require("./aliases.config").webpack
    }
  }
};
