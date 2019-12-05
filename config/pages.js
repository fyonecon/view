/*页面和模块信息配置*/

// 页面模块依赖的文件
const pages_load_file = {
    "pages_public_file": { // 所有页面公用js、css文件，全局有效
        "js": [
            "public/js/assist.js",  // 帮助框架可以在多种苛刻条件下正常使用
            "public/js/vue.min.js",  // vue.js框架，实现双向绑定
            "public/js/all.js",
            "public/js/common.js",
        ],
        "css": [
            "public/css/all.css",
            "public/css/animate.min.css",
            "public/css/common.css",
        ],
    },
    "pages_model_file": [ // pages模块页面白名单配置，未配置白名单将跳入默认route
        // 开始-默认页面模块
        { // 页面模块-404
            "route"     : "404",  // url中#route=xxx，便于定位页面
            "file_path" : "404/404.htm", // 实际文件路径+文件名，为了方便起见，文件后缀统一用“htm”
            "title"     : "404-页面没找到",  // 页面title
            "file"      : [  // 本页面需要引入的局部资源文件
                {
                    "js": [
                        "pages/404/404.js",  // 模块页面js，模块中有效
                    ],
                    "css": [
                        "pages/404/404.css?",  // 模块页面css，模块中有效
                    ],
                },
            ],
        },
        { // 页面模块-home
            "route"     : "home",
            "file_path" : "home/home.htm",
            "title"     : "主页-H5",
            "file"      : [
                {
                    "js": [
                        "pages/home/home.js",
                    ],
                    "css": [
                        "pages/home/home.css",
                    ],
                },
            ],
        },
        // 结束-默认页面模块

        // 开始-范本页面
        { // 页面模块-vue
            "route"     : "vue",
            "file_path" : "vue/vue.htm",
            "title"     : "测试vue.js双向绑定",
            "file"      : [
                {
                    "js": [
                        "pages/vue/vue-js.js",
                    ],
                    "css": [
                        "pages/vue/vue-css.css",
                    ],
                },
            ],
        },
        { // 页面模块-test
            "route"     : "test",
            "file_path" : "test/test.htm",
            "title"     : "测试test",
            "file"      : [
                {
                    "js": [
                        "pages/test/test.js",
                    ],
                    "css": [
                        "pages/test/test.css?",
                    ],
                },
            ],
        },
        // 结束-范本页面模块


        // 开始-其他自定义模块





        // 结束-其他自定义模块

    ],

};

