/*页面和模块信息配置*/
/*路由注册（白名单）*/

// 1. 所有页面公用js、css文件，全局有效
// 2. 注册全局组件
const page_static_file = {
    "js": [
        "static/js/page_assist.js",  // 框架援救。帮助框架可以在多种苛刻条件下正常使用
        "static/js/page_all.js", // 自定义的全局调用函数
        "static/js/vue.min.js",  // vue.js框架。
        "static/js/qrcode.js", // 全局自带生成QR
        "parts/bg_animate/bg_animate.js", // 全局背景动画
        // 可选
        // "parts/nav/nav.js",
        // "parts/foot/foot.js",

    ],
    "css": [
        "static/css/page_all.css",
        "static/css/animate.min.css",
        "parts/bg_animate/bg_animate.css",
        // 可选
        // "parts/foot/foot.css",

    ],
};


// pages模块页面白名单配置
const pages = [
    // 开始-其他页面模块
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
    { // 页面模块
        "route"     : "ag",
        "file_path" : "ag/ag.htm",
        "title"     : "服务提醒Ag",
        "file"      : [
            {
                "js": [
                    "pages/ag/ag.js",
                ],
                "css": [
                    "pages/ag/ag.css",
                ],
            },
        ],
    },
    { // 页面模块
        "route"     : "au",
        "file_path" : "au/au.htm",
        "title"     : "服务提醒Au",
        "file"      : [
            {
                "js": [
                    "pages/au/au.js",
                ],
                "css": [
                    "pages/au/au.css",
                ],
            },
        ],
    },
    { // 页面模块
        "route"     : "tts",
        "file_path" : "tts/tts.htm",
        "title"     : "服务提醒tts",
        "file"      : [
            {
                "js": [
                    "pages/tts/tts.js",
                    "pages/tts/voice.js",
                ],
                "css": [
                    "pages/tts/tts.css",
                ],
            },
        ],
    },
    { // 页面模块
        "route"     : "search",
        "file_path" : "search/search.htm",
        "title"     : "搜索转发，跳过验证",
        "file"      : [
            {
                "js": [
                    "pages/search/search.js",
                ],
                "css": [
                    "pages/search/search.css",
                ],
            },
        ],
    },
    // 结束-其他页面模块

    // 开始-模块范本
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
    // 结束-模块范本

    { // 页面模块-FM
        "route"     : "fm",
        "file_path" : "fm/fm.htm",
        "title"     : "红杏出墙FM",
        "file"      : [
            {
                "js": [
                    "pages/fm/fm.js",
                ],
                "css": [
                    "pages/fm/fm.css",
                ],
            },
        ],
    },


    { // 页面模块-home
        "route"     : "home",
        "file_path" : "home/home.htm",
        "title"     : "GoGuideViewStudio" + page_title,
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
    { // 页面模块
        "route"     : "run-project",
        "file_path" : "run-project/run-project.htm",
        "title"     : "经营项目" + page_title,
        "file"      : [
            {
                "js": [
                    "pages/run-project/run-project.js",
                ],
                "css": [
                    "pages/run-project/run-project.css",
                ],
            },
        ],
    },
    { // 页面模块
        "route"     : "open-source",
        "file_path" : "open-source/open-source.htm",
        "title"     : "开源项目" + page_title,
        "file"      : [
            {
                "js": [
                    "pages/open-source/open-source.js",
                ],
                "css": [
                    "pages/open-source/open-source.css",
                ],
            },
        ],
    },
    { // 页面模块
        "route"     : "about",
        "file_path" : "about/about.htm",
        "title"     : "关于作者" + page_title,
        "file"      : [
            {
                "js": [
                    "pages/about/about.js",
                ],
                "css": [
                    "pages/about/about.css",
                ],
            },
        ],
    },
    { // 页面模块-富文本
        "route"     : "rich-text",
        "file_path" : "rich-text/rich-text.htm",
        "title"     : "(rich-text)" + page_title,
        "file"      : [
            {
                "js": [
                    "pages/rich-text/rich-text.js",
                ],
                "css": [
                    "pages/rich-text/rich-text.css",
                ],
            },
        ],
    },

    { // 页面模块-富文本
        "route"     : "calc",
        "file_path" : "calc/calc.htm",
        "title"     : "科学计算器",
        "file"      : [
            {
                "js": [
                    "pages/calc/calculator.js",
                    "pages/calc/calc.js",
                ],
                "css": [
                    "pages/calc/calculator.css",
                    "pages/calc/calc.css",
                ],
            },
        ],
    },
    { // 页面模块-富文本
        "route"     : "calculator",
        "file_path" : "calculator/calculator.html",
        "title"     : "科学计算器",
        "file"      : [
            {
                "js": [
                    "pages/calculator/calculator.js",
                    "pages/calculator/calculator.js",
                ],
                "css": [
                    "pages/calculator/calculator.css",
                    "pages/calculator/calculator.css",
                ],
            },
        ],
    },



    // =============================================

    { // 页面模块-转转乐
        "route"     : "zzl-vip",
        "file_path" : "zzl-vip/zzl-vip.htm",
        "title"     : "喜迎双12，嗨翻钜惠！",
        "file"      : [
            {
                "js": [
                    "pages/zzl-vip/zzl-vip.js",
                ],
                "css": [
                    "pages/zzl-vip/zzl-vip.css",
                ],
            },
        ],
    },




];

