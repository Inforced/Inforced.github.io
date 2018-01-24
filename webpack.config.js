const isProduction = process.env.NODE_ENV === 'production'

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

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
            loader: 'pug-html-loader?pretty&exports=false'
          }
        ]
      },
      {
        test: /\.sass$/,
        use: extractSass.extract({
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader'
            }
          ],
          // use style-loader in development
          fallback: 'style-loader'
        })
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    extractSass,
    new HtmlWebpackPlugin({
      template: 'src/index.pug'
    })
  ]
}
