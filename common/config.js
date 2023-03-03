/*自定义配置页面的一些全局参数*/

/*
* 1）页面生命周期（index.html--config.js--框架解析index.js--公共all.js/css文件--执行wifi广告劫持严重和清除--pages.htm--pages.js--page_loaded.js）。
* 2）不依赖于node但需依赖服务端环境，或者依赖CDN环境。
* */

"use strict";

const debug = false;                     // 调试模式，统一打印日志，true & false

// 框架渲染的必要参数
const cookie_prefix   = "view_ggvs_";   // cookie前缀
const route_404       = "?route=404";   // 404

const file_url        = index_file_url?index_file_url:"./";             // 资源文件CDN主域名（js、css、img、font等资源文件）//cdnaliyun.oss-cn-hangzhou.aliyuncs.com/view-ggvs/
const page_url        = index_file_url?index_file_url:"./";             // htm文件的服务器地址，因为使用了ajax请求，不能直接请求本地文件，可以全部放在CDN里面

const cache_time      = 1000*1000; // 缓存时间：ms
const page_time       = "view-pages-"+Math.floor((new Date()).getTime()/cache_time)*cache_time;

const api_url         = "https://xcx.xxx.cn/chengzi/public/index.php/api/";  // api主地址

// 白名单host或refer域名
const app_url = {
    'check_url': "host", // 是否开启白名单url检测，"refer"开启refer检测，"host"开启host检测，"any"不检测
    'jump_url': 'https://www.bing.com/', // 遇到黑名单refer的落地地址
    'white_url': [ // 仅检测主域名，不包括http协议和url路径
        '0.0.0.0', '127.0.0.1', 'localhost',
        'cdnaliyun.oss-cn-hangzhou.aliyuncs.com',
        'cdnaliyun.oss-accelerate-overseas.aliyuncs.com',
        'ginvel.com',
        'ggvs.net',
    ],
};

// 自定义
// App验证参数
const app_class = "view_ggvs";
const app_version = "v3.2.0";
const app_name = "view单页web框架";
const app_platform = "WebApp";

// 登录用户使用的验证参数
let login_token = "";
let login_id = 0;
let login_name = "";
let login_level = 0;
let login_level_name = "（未知等级）";
let login_nickname = "（未登录）";



