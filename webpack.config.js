const isProduction = process.env.NODE_ENV === 'production'

const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const extractSass = new ExtractTextPlugin({
    filename: 'inforced.[contenthash].css',
    disable: !isProduction
})

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'inforced.[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: isProduction
            }
          },
          {
            loader: 'pug-html-loader?exports=false'
          }
        ]
      },
      {
        test: /\.sass$/,
        use: extractSass.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            {
              loader: 'sass-loader'
            }
          ],
          // use style-loader in development
          fallback: 'style-loader'
        })
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,  
        use: [
          {
            loader: 'url-loader',
            options: { 
              limit: 8000,
              name: 'images/[hash]-[name].[ext]'
            } 
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([
      { from: 'src/config/CNAME' },
      { from: 'src/config/robots.txt' },
      { from: 'src/favicons/*', to: '[name].[ext]' }
    ]),
    extractSass,
    new UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.pug'
    })
  ]
}
