const path = require('path')
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "@views": path.join(__dirname, "..", "src", "views"),
        "@components": path.join(__dirname, "..", "src", "components"),
        "@config": path.join(__dirname, "..", "src", "config"),
        "@assets": path.join(__dirname, "..", "src", "assets"),
        "@store": path.join(__dirname, "..", "src", "store"),
      }
    }
  }
}