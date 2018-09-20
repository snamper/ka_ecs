module.exports = {
	baseUrl: '/ecs/',
	outputDir: 'dist',
	// assetsDir: '',
	indexPath: 'index.html',
	filenameHashing:true,
	pages: {
		index: {
			entry: 'src/main.js',
			template: 'public/index.html',
			filename: 'index.html',
			title: '远特运营中心',
			chunks: ['chunk-vendors', 'chunk-common', 'index']
		},
	},
	lintOnSave: false,
	runtimeCompiler: false,
	transpileDependencies:[],
	productionSourceMap:false,
	crossorigin:undefined,
	integrity:false,
	configureWebpack: () => {},
	chainWebpack: () => {},
	css: {
		extract: true,
		sourceMap: false,
		loaderOptions: {},
		modules: false
	},
	devServer: {
		open: true,
		host: '0.0.0.0',
		port: 8080,
		https: false,
		hot: true,
		proxy: {
	        '/km_center_ecs/': {
	            target:'http://192.168.10.110:8081',
	            changeOrigin:true,
	            pathRewrite:{
	                '/ecs/km_center_ecs/':'/km_center_ecs/'
	            }
	        },
	        '/km-ecs/': {
	            // target:'http://192.168.10.66:6086',
	            target:'http://192.168.10.117:6086',
	            changeOrigin:true,
	            pathRewrite:{
	                '/ecs/km-ecs/':'/ecs/'
	            }
	        },
	        '/km_ums/': {
	            target:'http://192.168.10.14:6088',
	            changeOrigin:true,
	            pathRewrite:{
	                '/ecs/km_ums/':'/ums/'
	            }
	        },
	        '/ym-ecs/': {
	            // target:'http://192.168.10.110:8080',
	            target:'http://192.168.10.117:8080',
	            changeOrigin:true,
	            pathRewrite:{
	                '/ecs/ym-ecs/':'/ecs/'
	            }
	        },
	    },
	},
	parallel: require('os').cpus().length > 1,
	pwa: {
		// ...
	},
	pluginOptions: {
		// ...
	}
}