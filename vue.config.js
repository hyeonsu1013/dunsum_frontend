const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  lintOnSave:false,
  css : {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "@/assets/scss/variables.scss";
        `,
      },
    },
  },
  devServer: {
    host: 'dunsum-local.kr',
    proxy: {
      '/df':{
        "target":'https://api.neople.co.kr',
        "pathRewrite":{'^/':''},
        "changeOrigin":true,
        "secure":false
      },
      '/dunsum':{
        "target":'http://dunsum-local.kr:9090',
        "pathRewrite":{'^/':''},
        "changeOrigin":true,
        "secure":false
      }
    }
  }
})
