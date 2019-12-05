/*自定义配置页面的一些全局参数*/

/*
* 1）页面生命周期（index.html--config.js--框架解析index.js--公共all.js/css文件--执行wifi广告劫持严重和清除--pages.htm--pages.js--page_loaded.js）。
* 2）不依赖于node但需依赖服务端环境，或者依赖CDN环境。
*
* */

const config = {
    "debug": true,                      // 调试模式，统一打印日志
    "cookie_prefix": "view_",           // cookie前缀
    "route_404": "?route=404",          // 404
    "route_default": "?route=home",     // 页面进入默认页
    "file_url": "",                     // 资源文件CDN主域名（js、css、img、font等资源文件）
    "page_url": "",                     // htm文件的服务器地址，因为使用了ajax请求，不能直接请求本地文件，可以全部放在CDN里面
    "cache_time": 100,                  // 缓存时间：s
    "page_time": Math.floor((new Date()).getTime()/100)*100,  // 页面时间戳：x秒为资源单位，x秒（文件缓存周期）后刷新页面浏览器会改变资源文件的缓存
    "api_url": "//api.xxx.com/cswd/public/index.php/api/",  // api主地址
};

