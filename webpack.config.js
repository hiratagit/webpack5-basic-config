const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development", // "production"
    devtool: "source-map", // デバッグでjsコードを読みやすくする、必須ではない
    entry: "./src/scripts/index.js",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "scripts/main.js",
    },
    devServer: {
        // static: "./dist",
        static: path.resolve(__dirname, "src"),
    },
    resolve: {
        extensions: [".js", ".glsl"],   // 拡張子の記述を省く事が出来る
    },
    module: {
        rules: [
            // Javascriptのコンパイル babelローダー
            {
                test: /\.js$/,           // 拡張子が.jsで終わるファイルに対して
                exclude: /node_modules/, // node_modulesディレクトリ以下のjsコンパイルは避ける
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                ["@babel/preset-env", { "targets": "> 0.25%, not dead" }]
                            ],
                        }
                    },
                ],

            },
            //html
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                    },
                ],
            },
            // css, sass
            {
                test: /\.(css|sass|scss)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader, // "style-loader"から変更する
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: false,  // scssのソースマップが得られるがファイルサイズが大きくなるので一旦false
                        }
                    },
                    {
                        loader: "sass-loader",
                    },
                ],
            },
            // Image
            {
                test: /\.(jpg|png|gif|svg)$/,
                type: "asset/resource",     // souceではなく、resouce
                loader: "image-webpack-loader",
                generator: {
                    filename: "images/[hash][ext]",  //.[ext]とはしない
                }
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: './stylesheets/style.css',
        }),
        new HtmlWebpackPlugin({
            template: "./src/templates/index.html",
            filename: "index.html",
        }),
        new HtmlWebpackPlugin({
            template: "./src/templates/access.html",
            filename: "access/index.html",
        }),
        new CleanWebpackPlugin(),
        // 静的フォルダのdistへのコピー
        new CopyPlugin({
            patterns: [
              { from: "./src/pdf", to: "pdf" },
            ],
          }),
    ],
}
