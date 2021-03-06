const path = require("path");
const resolve = dir => path.join(__dirname, dir);
module.exports = {
    // 发布模式
    // lintOnSave: false,
    chainWebpack: config => {
        config.resolve.alias
            .set("vue$", "vue/dist/vue.esm.js")
            .set("@", resolve("src"))
            .set("@/assets", resolve("src/assets"))
            .set("@/components", resolve("src/components"))
            .set("@/views", resolve("src/views"))
            .set("@/router", resolve("src/router"))
            .set("@/store", resolve("src/store"));
        // 生产环境取消console.log
        config.optimization.minimizer('terser').tap((args) => {
            args[0].terserOptions.compress.drop_console = true
            return args
        })
        config.when(process.env.NODE_ENV === 'production', config => {
                config.entry('app').clear().add('./src/main-prod.js')
                config.set('externals', {
                        vue: 'Vue',
                        'vue-router': 'VueRouter',
                        axios: 'axios',
                        // vuex: 'Vuex',
                    })
                    // config.plugin('html').tap(args => {
                    //     args[0].isProd = true
                    //     return args
                    // })
            })
            // 开发模式
        config.when(process.env.NODE_ENV === 'development', config => {
            config.entry('app').clear().add('./src/main-dev.js')
                // config.plugin('html').tap(args => {
                //     args[0].isProd = false
                //     return args
                // })
        })
    },

    // // 代理
    // devServer: {
    //     // open: true, // auto open brower 项目启动后自动打开浏览器...
    //     disableHostCheck: false,
    //     host: "0.0.0.0",
    //     port: 8099, // 修改端口号
    //     https: false,
    //     hotOnly: false, // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
    //     proxy: { // string | Object 解决跨域问题
    //         '/api': {
    //             target: 'http://39.108.90.170:5858',
    //             changeOrigin: true,
    //             ws: true,
    //             // pathRewrite: {
    //             //   '^/api': ''
    //             // }
    //         }
    //     },
    // },
}