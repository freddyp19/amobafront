const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        timeout: 6000,
        secure: false,
        changeOrigin: true
      }
    }
  }
 
});

/*
module.exports = {
  transpileDependencies: true,
  devServer: {
    proxy: 'http://localhost:8000',
  }
}*/
/*
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:8000',
        ws: true,
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': '/api'
        },
        headers: {
          Connection: 'keep-alive'
        },
        logLevel: 'debug'
      }
    }
  }
})
*/
