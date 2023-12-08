/*自定义配置页面的一些全局参数*/
/*
* 1）页面生命周期（index.html--config.js等插件--depend.js--公共js/css文件--解析路由--page_init.js--pages.html、pages.js--start_page()函数 ）。
* 2）不依赖node，但需依赖服务端环境，或者需要CDN环境。
* 3）一般运行到start_page()函数会花费900ms左右。
* */
"use strict";

const debug = false; // 调试模式，统一打印日志，true & false
const block_wechat = true; // 是否禁止在微信中打开，true & false

// 框架渲染的必要参数
const cookie_prefix   = "view_";   // cookie前缀
const route_404       = "?route=404";   // 404
const page_time       = "cache=" + index_func.MakeDate("YmdW");

const api_url         = "./";  // api主地址
const kws_url         = (window.location.host.toLowerCase().indexOf("wails") !== -1)?"http://view.ggvs.net":"." + "/view/";
const search_url      = "http://view.ggvs.net" + "/view/view.html";

// 白名单host或refer域名
const app_url = {
    'check_url': "host", // 是否开启白名单url检测，"refer"开启refer检测，"host"开启host检测，"any"不检测
    'jump_url': 'https://www.bing.com/?info=black-host', // 遇到黑名单refer的落地地址
    'white_url': [ // 仅检测主域名，不包括http协议和url路径
        '0.0.0.0', '127.0.0.1', 'localhost',
        'aliyuncs.com',
        // 'myqcloud.com',
        '3so.net',
        'wails',
	    'gvs.net',
    ],
};

// 自定义
// App验证参数
const app_class = "view_";
const app_version = "v2";
const app_name = "简单主页";
const app_email = "";

// 登录用户使用的验证参数
let login_timeout = 180*24*60*60*1000; // 180天过期
let login_token = "";
let login_id = 0;
let login_name = "";
let login_level = 0;
let login_level_name = "（未知等级）";
let login_nickname = "（未登录）";
