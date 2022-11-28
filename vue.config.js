module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: { output: { filename: `[name].[fullhash].bundle.js?ver=1.6.4` } },
}
