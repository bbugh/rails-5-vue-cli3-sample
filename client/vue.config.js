const WebpackAssetsManifest = require('webpack-assets-manifest')

module.exports = {
  outputDir: '../public/assets/client',
  // // output the html to actual erb layout file used by clients_controller, see chainWebpack comment
  // indexPath: '../../../app/views/layouts/client.html.erb',
  chainWebpack: config => {
    // disable the generation of index.html, because we don't use it.
    config.plugins.delete('html')
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')

    // Alternatively, you can choose not to minify it and output ERB instead - see indexPath
    // config.plugin('html').tap(args => [{ ...args[0], minify: false }])
  },
  configureWebpack: {
    plugins: [
      // output a manifest.json so that the Rails app can load with `app.js` instead of a hashed name
      new WebpackAssetsManifest({
        writeToDisk: true, // always write manifest.json to disk even in dev server mode, so Rails can pick it up
        publicPath: true // `true` uses Vue's webpack publicPath
      })
    ]
  },

  devServer: {
    headers: {
      // Allow HMR from Rails so that dev mode can access dev server
      'Access-Control-Allow-Origin': '*'
    }
  },

  // Set up the baseURL for running in development with HMR dev server via "yarn serve"
  // In development, all assets will point to the dev server; in production it points
  // to the assets generated by assets:precompile.
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/assets/client'
    : 'http://localhost:8080/',
}
