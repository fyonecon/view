/*自定义配置页面的一些全局参数*/

/*
* 1）页面生命周期（index.html--config.js--框架解析index.js--公共all.js/css文件--执行wifi广告劫持严重和清除--pages.htm--pages.js--page_loaded.js）。
* 2）不依赖于node但需依赖服务端环境，或者依赖CDN环境。
* */

const debug = true;                     // 调试模式，统一打印日志，true & false

// 框架渲染的必要参数
const cookie_prefix   = "view_ggvs_";        // cookie前缀
const route_404       = "?route=404";   // 404
const route_default   = "?route=home";  // 页面进入默认页

const file_url        = index_file_url?index_file_url:"./";             // 资源文件CDN主域名（js、css、img、font等资源文件）//cdnaliyun.oss-cn-hangzhou.aliyuncs.com/view-ggvs/
const page_url        = index_file_url?index_file_url:"./";             // htm文件的服务器地址，因为使用了ajax请求，不能直接请求本地文件，可以全部放在CDN里面

const cache_time      = 10000;            // 缓存时间：s
const page_time       =  "cache"; //Math.floor((new Date()).getTime()/10000)*cache_time;  // 页面时间戳：x秒为资源单位，x秒（文件缓存周期）后刷新页面浏览器会改变资源文件的缓存

const api_url         = "https://xcx.ggvs.cn/chengzi/public/index.php/api/";  // api主地址

const page_title      = " - ggvs.org";

// 自定义
// 不需要登录使用的验证参数
let app_class = "view_ggvs";
// 登录用户使用的验证参数
let app_token = "";
let user_token = "";
let user_id = 0;


