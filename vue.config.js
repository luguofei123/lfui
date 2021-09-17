const path = require('path')
module.exports = {
  // 选项...
  // 这个值和路由中的base:baseUrl是一个值process.env.NODE_ENV === 'production'? '/production-sub-path/': '/'
  // 如果是部署到服务器的根路径 publicPath：'/'
  // 如果是部署到服务器的根路径下的dist目录 那么publicPath：'dist/'
  // 如果是部署到服务器的根路径下的vue-elementUI-pc/dist目录 那么publicPath：'vue-elementUI-pc/dist/'
  // 根本用不到相对路径
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'assets',
  // indexPath: 'index.html',
  filenameHashing: true,
  pages: {
    index: {
      entry: 'src/main.js',
      template: path.resolve(__dirname, 'public/index.html'),
      filename: 'index.html',
      title: 'APP',
      hash: true // 引入产出的资源时加上哈希避免缓存,在html中的js和css后面加上？hash值
    }
  },
  lintOnSave: false,
  runtimeCompiler: false,
  transpileDependencies: [],
  productionSourceMap: false,
  crossorigin: undefined,
  integrity: false,
  devServer: {
    port: 8081
  }
}
