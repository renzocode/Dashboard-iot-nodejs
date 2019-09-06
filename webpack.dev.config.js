const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
	entry : {
		main :  './src/bundle/index.js',
    	create :'./src/bundle/crud/bundle-create.js',
    	signin :'./src/bundle/crud/bundle-signin.js',
    	shell : './src/bundle/crud/bundle-shell.js'
	},
	output : {
		path : path.join(__dirname, 'public'),
		publicPath : '/',
		filename : 'apps/[name]/build/bundle.js'
	},
	target : 'web',
	devtool : '#source-map',
	module : {
		rules : [
			{
				test : /\.js$/,
				exclude : /node_modules/,
				use : {
					loader : "babel-loader"
				}
			},
			{
				test : /\.html$/,
				use : [
					{
						loader : "html-loader"
					}
				]
			},
			{
				test : /\.css$/i,
				use : ['style-loader', 'css-loader']
			},
			{
				test : /\.(png|svg|jpg|gif)$/,
				use : ['file-loader']
			},
			 {
          		test: /\.(eot|woff2?|svg|ttf)([\?]?.*)$/,
          		use: ['file-loader', 'url-loader']
        	}
		]
	},
	plugins : [
		new HtmlWebpackPlugin({
			template : "./src/html/index.html",
			filename: "./index.html",
      //inject : 'true',
      		chunks : ['main'],
      //chunksSortMode : 'dependency',
      		excludeChunks : ['server']
		}),
		new HtmlWebpackPlugin({
			template : "./src/html/create.html",
      		inject : 'false',
      		chunks : ['create'],
      		//chunksSortMode : 'dependency',
      		filename : "./pages/create.html"
			//excludeChunks : ['server']
		}),
		new HtmlWebpackPlugin({
			template : "./src/html/signin.html",
			inject : "false",
			chunks : ["signin"],
			filename : "./signin.html"
		}),
		new HtmlWebpackPlugin({
			template : "./src/html/spa.html",
			inject : "false",
			chunks : ["shell"],
			filename : "./dashboard.html"
		}),
		new HtmlWebpackPlugin({
			template : "./src/html/spa.html",
			inject : "false",
			chunks : ["shell"],
			filename : "./spa.html"
		})
	]

}
