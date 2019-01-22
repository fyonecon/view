/*
*  页面和模块信息配置
* */

const debug         = true;  // 调试模式
let route_404       = "index.html#route=404";  // 404
let route_default   = "index.html#route=home";  // 页面进入默认页
const file_cdn      = "";  // 资源文件cdn主域名（js、css）
const api_url       = "";  // api主地址
const page_time     = Math.floor((new Date()).getTime()/1000);  // 页面时间戳：s

// 页面公用js、css文件
const page_public_file = {
    "js": [
        file_cdn + "file/js/common.js?" + page_time,
        file_cdn + "file/js/all.js?" + page_time,
        file_cdn + "file/common/foot/foot.js?" + page_time,  // foot
    ],
    "css": [
        file_cdn + "file/css/all.css?" + page_time,
        file_cdn + "file/css/animate.min.css?" + page_time,
        file_cdn + "file/css/common.css?" + page_time,
    ],
};

// 模块白名单配置
const pages = [

    // 开始-模块范本，不需要做修改。
    { // 页面-404
        "route"     : "404",  // url中#route=xxx，便于定位页面
        "file_path" : "404/404.htm", // 实际文件路径+文件名
        "title"     : "404-页面没找到",  // 页面title
        "file"      : [  // 本页面需要引入的局部资源文件
            {
                "js": [
                    file_cdn + "pages/404/404.js?" + page_time,
                ],
                "css": [
                    file_cdn + "pages/404/404.css?" + page_time,
                ],
            },
        ],
    },
    { // 页面-vue
        "route"     : "vue",
        "file_path" : "vue/vue.htm",
        "title"     : "测试vue.js双向绑定",
        "file"      : [
            {
                "js": [
                    file_cdn + "pages/vue/vue.min.js?" + page_time,  // vue.js框架
                    file_cdn + "pages/vue/vue-js.js?" + page_time,
                ],
                "css": [
                    file_cdn + "pages/vue/vue-css.css?" + page_time,
                ],
            },
        ],
    },
    // 结束-模块范本

    // 开始-其他页面模块

    { // 页面-home
        "route"     : "home",
        "file_path" : "home/home.htm",
        "title"     : "主页",
        "file"      : [
            {
                "js": [
                    file_cdn + "pages/home/home.js?" + page_time,
                ],
                "css": [
                    file_cdn + "pages/home/home.css?" + page_time,
                ],
            },
        ],
    },

    // 结束-其他页面模块
];