/*
 *	List of .twig file templates for HtmlWebpackPlugin to iterate through
 *	TO DO: refactor using filesystem or glob?
 */
const twigTemplates = [
	'index',
	'how-we-work',
	'services',
	'contact'
];

/*
 *	Webpack Configuration docs
 *	https://webpack.js.org/configuration/
 */

const merge = require('webpack-merge'); //https://simonsmith.io/organising-webpack-config-environments/
const baseConfig = require('./webpack.base.config.js');
const path = require('path');
const fs = require('fs');

/*
 *	For generating HTML with injected CSS and JS:
 *	https://github.com/jantimon/html-webpack-plugin
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');


//default settings
const HtmlWebpackPluginSettings = {

	inject : false,
	minify: {
		collapseWhitespace: true,
		removeComments: true,
		removeRedundantAttributes: true,
		removeScriptTypeAttributes: true,
		removeStyleLinkTypeAttributes: true,
		useShortDoctype: true
	},
	hash: false,
    svgoConfig: {
    	mergePaths: false,
    },			
}



let generateHTMLPlugins = twigTemplates.map(function(filename) {
	return new HtmlWebpackPlugin({
		...HtmlWebpackPluginSettings,
		filename: '../../' + filename + '.html',
		template: '_twig/' + filename + '.twig',
	})
});

module.exports = merge(baseConfig, {

	module: {
		rules: [
			//	Compile twig templates
			//	https://github.com/radiocity/twig-html-loader
		    {
				test: /\.twig$/,
				use: [
				'raw-loader',
					{
						loader: 'twig-html-loader',
						options: {
							namespaces: {
								'layout': path.join(__dirname, '_twig/layout'),
								'components': path.join(__dirname, '_twig/components'),
							},
							data: (context) => {
								
								let globalData = {};
								let localData = {};

								let globalDataFile = path.join(__dirname, '_json/global.json');
								globalData = context.fs.readJsonSync(globalDataFile, { throws: false });

								//get template name from context for local data...
								let resource = context.resource;
								resource = resource.replace(path.join(__dirname, '_twig/'), '');
								filename = resource.replace('.twig', '');

								//check if corresponding local data json file exists...								
								let localDataFile = path.join(__dirname, '_json/'+filename+'.json');
								

								if( fs.existsSync( localDataFile )) {
									//if so, expose it as a template data
									localData = context.fs.readJsonSync(localDataFile, { throws: false });
								}

								let twigContext = {
									
									...globalData,
									...localData,

									//override assets directory root for twig templates (JS enviroment only, needed for embedding SVGs using {{source}})
									"root_assetsDir" : path.join(__dirname, '../assets/'),
								};

								// Force webpack to watch file
								context.addDependency(globalDataFile);
								context.addDependency(localDataFile); 
								return twigContext;
							}
						}
					}
		      	]
		    }
		]
	},
	
	plugins: [

		...generateHTMLPlugins

	]

});