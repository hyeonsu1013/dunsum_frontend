const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer: {
    proxy: {
      '/df':{
        "target":'https://api.neople.co.kr',
        "pathRewrite":{'^/':''},
        "changeOrigin":true,
        "secure":false
      },
      '/dunsum':{
        "target":'http://localhost:9090',
        "pathRewrite":{'^/':''},
        "changeOrigin":true,
        "secure":false
      }
    }
  }
})
