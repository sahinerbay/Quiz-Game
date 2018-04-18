//It moves all the required *.css modules in entry chunks into a separate CSS file. So your styles are no 
//longer inlined into the JS bundle, but in a separate CSS file ( styles.css )
//.css files need to be imported in src index.js
//ExtractTextPlugin not supported in webpack4, instead use MiniCssExtractPlugin
//https://hackernoon.com/a-tale-of-webpack-4-and-how-to-finally-configure-it-in-the-right-way-4e94c8e7e5c1
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

//generates an HTML file with <script> injected, writes this to dist/index.html.
const HtmlWebPackPlugin = require("html-webpack-plugin");
// minifies the file
const htmlPlugin = new HtmlWebPackPlugin({
    template: __dirname + "/src/index.html",
    filename: "./index.html"
});
const CleanWebpackPlugin = require('clean-webpack-plugin');


const path = require('path');
const webpack = require('webpack');

module.exports = {

    entry: {
        main: './src/index.js'
    },

    //starting from webpack 4 there is no need to define the entry point: it will take ./src/index.js as the default!
    // entry: [
    //     './src/index.js'
    // ],

    //there is also no need to define the output file. It will create /dist/main.js as default
    output: {
        path: path.resolve(__dirname, '/build/'),
        filename: 'bundle.js',

        //https://stackoverflow.com/questions/28846814/what-does-publicpath-in-webpack-do
        //By using /assets/, the app will find webpack assets at: http://server/assets/. 
        //Under the hood, every urls that webpack encounters will be re-written to begin with "/assets/".
        //include script tags inside index.html
        // publicPath: '/build/'
    },

    module: {
        rules: [{
                // you can configure babel-loader to read .jsx files too. 
                //This is useful if you’re using the jsx extension for your React components.
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    //transpiling JavaScript files using Babel and webpack.
                    loader: "babel-loader",
                    query: {
                        plugins: ['transform-object-rest-spread'],
                        presets: [
                            //Determines which transformations/plugins to use and polyfills (provide modern functionality on older 
                            //browsers that do not natively support it) based on the browser matrix you want to support
                            "env",

                            "es2015",
                            "stage-2",
                            "es2017",

                            //Babel preset for all React plugins, for example turning JSX into functions.
                            "react"
                        ]
                    }
                }
            },
            { //Exports HTML as string. HTML is minimized when the compiler demands.
                test: /\.html$/,
                use: [{
                    loader: "html-loader",
                    options: {
                        minimize: true
                    }
                }]
            },
            //https://medium.freecodecamp.org/part-1-react-app-from-scratch-using-webpack-4-562b1d231e75
            //Note that the order of adding these loaders is important. First, we need to resolve 
            //the CSS files before adding them to the DOM with the style-loader. By default, webpack 
            //uses the loaders from the right (last element in the array) to the left (first element in the array).
            {
                test: /\.scss$/,
                use: [{
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: "[name]_[local]_[hash:base64]",
                            sourceMap: true,
                            minimize: true
                        }
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        htmlPlugin,
        new CleanWebpackPlugin(['build']),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development'),
                'API_URL': JSON.stringify('http://www.jservice.io/api/random')
            }
        }),
    ],
    // plugins: [
    //     new HtmlWebPackPlugin({
    //         template: "./src/index.html",
    //         filename: "./index.html"
    //     })
    // ]


    //webpack-dev-server does not create any file, but serves the bundle from memory when the according path is hit.
    //By default this is /, so when you try to load /bundle.js, you will get bundle from memory.
    devServer: {

        //https://stackoverflow.com/questions/42473979/webpack-dev-server-not-updating-bundle-when-saving-file
        //default / => http://localhost:5555
        //following '/build/' => http://localhost:5555/build/
        //publicPath: '/build/', //absolute to server url

        //From where you want to serve the files
        //Points where output.path is
        //if "./build/" http://localhost:5555/ will serve ./build
        //If "./" then http://localhost:5555/build/
        contentBase: "./build", //relative to server url

        //defines port
        port: 5555
    }
}

const config = {
    // development config
    resolve: {
        alias: {
            'Utils': path.resolve(__dirname, './src/utils/'),
            'Components': path.resolve(__dirname, './src/components/'),
        }
    }
};