module.exports = {
  configureWebpack: {
    entry: {
      app: "./src/main.js"
    },
    resolve: {
      alias: require("./aliases.config").webpack,
      modules: ["node_modules"]
    },
    module: {
      rules: [
        {
          test: /sigma.*/,
          use: "imports-loader?this=>window"
        }
      ]
    }
  }
};
