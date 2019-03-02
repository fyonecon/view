/*自定义配置页面的一些全局参数*/

/*
* 1）页面生命周期（index.html--config.js--框架解析index.js--公共all.js/css文件--执行wifi广告劫持严重和清除--pages.htm--pages.js--page_loaded.js）。
* 2）不依赖于node但需依赖服务端环境，或者依赖CDN环境。
* */

const debug = true;                     // 调试模式

const cookie_prefix   = "view_";        // cookie前缀
const route_404       = "#route=404";   // 404
const route_default   = "#route=home";  // 页面进入默认页
const file_url        = "";           // 资源文件CDN主域名（js、css、img、font等资源文件）
const page_url        = "pages/";     // htm文件的服务器地址，因为使用了ajax请求，不能直接请求本地文件，可以全部放在CDN里面
const page_time       = Math.floor((new Date()).getTime()/100000)*100;  // 页面时间戳：100秒为资源单位，100秒（文件缓存周期）后刷新页面浏览器会改变资源文件的缓存
const api_url         = "//xxx.com/public/index.php/";  // api主地址



