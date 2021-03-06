module.exports = {
    outputDir: 'dist', // 打包的目录
    lintOnSave: true, // 在保存时校验格式
    productionSourceMap: false, // 生产环境是否生成 SourceMap
    devServer: {
        open: true, // 启动服务后是否打开浏览器
        overlay: {
            // 错误信息展示到页面
            warnings: true,
            errors: true,
        },
        host: '0.0.0.0',
        port: 8066, // 服务端口
        https: false,
        hotOnly: false,
        // proxy: { // 设置代理
        //   '/api': {
        //     target: host,
        //     changeOrigin: true,
        //     pathRewrite: {
        //       '/api': '/',
        //     }
        //   },
        // },
    },
    configureWebpack: (config) => {
        config.module.rules.push({
            test: /\.vue$/,
            use: [
                {
                    loader: 'vue-windicss-preprocess',
                    options: {
                        config: 'tailwind.config.js', // tailwind config file path OR config object (optional)
                        compile: false, // false: interpretation mode; true: compilation mode
                        globalPreflight: true, // set preflight style is global or scoped
                        globalUtility: true, // set utility style is global or scoped
                        prefix: 'windi-', // set compilation mode style prefix
                    },
                },
            ],
        });
    },
};
