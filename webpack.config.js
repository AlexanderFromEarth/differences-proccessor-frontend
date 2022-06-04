const path = require('path');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const env = process.env.NODE_ENV || 'development'
const isDev = env !== 'production';
const styleLoader = {
  loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader
};
const cssModuleLoader = {
  loader: 'css-loader',
  options: {
    sourceMap: isDev,
    modules: {
      localIdentName: '[local]:[hash:base64:8]'
    }
  }
};
const cssGlobalLoader = {
  loader: 'css-loader',
  options: {
    modules: 'global'
  }
};
const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: [
        autoprefixer()
      ]
    }
  }
};
const sassLoader = {
  loader: 'sass-loader',
  options: {
    sourceMap: isDev
  }
}

module.exports = {
  entry: './src/index.tsx',
  mode: env,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'static/js/main.[fullhash:8].js',
    chunkFilename: 'static/js/main.[fullhash:8].js',
    publicPath: ''
  },
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'https://localhost:5001',
        secure: false,
        pathRewrite: {'^/api': ''}
      }
    }
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
        exclude: /node_modules/,
        use: [
          styleLoader,
          cssModuleLoader,
          postcssLoader,
          sassLoader
        ]
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          styleLoader,
          cssGlobalLoader,
          postcssLoader
        ]
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          },
        ]
      },
      {
        test: /\.(bmp|gif|jpg|jpeg|png)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      {
        exclude: /(node_modules)|(\.(js|jsx|ts|tsx|html|scss|css|svg)$)/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 10000,
              name: 'static/media/[name].[fullhash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/public/index.html',
      filename: 'index.html'
    }),
    ...!isDev ?
      [
        new MiniCssExtractPlugin(
          {
            filename: 'static/stylesheets/[name].[fullhash:8].css',
            chunkFilename: 'static/stylesheets/[name].[fullhash:8].css'
          }
        )
      ] :
      []
  ]
};
