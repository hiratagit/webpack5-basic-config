# インストール
npm i -D webpack webpack-cli webpack-dev-server
npm i -D css-loader style-loader sass sass-loader
npm i -D babel-loader @babel/core @babel/preset-env

npm i -D html-webpack-plugin
npm i -D mini-css-extract-plugin
npm i -D image-webpack-loader
npm i -D clean-webpack-plugin

## Pugを使用する場合
npm i -D pug-html-loader
npm i -D html-loader

## scripts
"scripts": {
  "start": "webpack-dev-server",
  "dev": "webpack --mode=development",
  "build": "webpack --mode=production"
},


