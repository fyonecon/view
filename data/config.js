/*配置参数*/

const debug = true;   // 调试模式
const cookie_prefix = "view_";  // cookie前缀
const route_404       = "index.html#route=404";  // 404
const route_default   = "index.html#route=home";  // 页面进入默认页
const file_url        = "./";  // 资源文件cdn主域名（js、css）
const api_url         = "//api.xxx.com/xxx/public/index.php/";  // api主地址
const page_time       = Math.floor((new Date()).getTime()/100000)*100;  // 页面时间戳：100秒为资源单位
const index_load = { // 框架依赖的其他js文件，注意这里是框架依赖的
    "index_js": [
        "depend/com-ajax.js",
        "data/pages.js",
        "data/md5.js",
        // 以上两个文件不需要更改位置

    ],
};


// 日志打印统一函数
function console_log(txt) {
    if (txt === 0 || txt === "0") {}else {if (!txt){txt = "空txt";} }
    debug === true ? console.log(txt): "";
}