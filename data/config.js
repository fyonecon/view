/*配置参数*/

const debug = true;   // 调试模式
const cookie_prefix = "view_";  // cookie前缀
const route_404       = "#route=404";  // 404
const route_default   = "#route=home";  // 页面进入默认页
const file_url        = "./";  // 资源文件cdn主域名（js、css）
const api_url         = "//xxx.com/public/index.php/";  // api主地址
const page_url        = "./pages/";  // htm文件的服务器地址，因为使用了ajax请求，不能直接请求本地文件
const page_time       = Math.floor((new Date()).getTime()/100000)*100;  // 页面时间戳：100秒为资源单位

const index_load = { // 框架依赖的其他js文件，注意这里是框架依赖的
    "index_js": [
        "depend/com-ajax.js",
        "data/pages.js",
        "data/md5.js",
        // 以上两个文件不需要更改位置

    ],
};




// 框架自带公共函数
let view = {
    "log": function (txt) { // 日志打印统一函数
        if (txt === 0 || txt === "0") {}else {if (!txt){txt = "空txt";} }
        debug === true ? console.log(txt): "";
    },
    "write_htm": function (file_path, by_id, call_func) {  // 注射文件 | 写入htm
        $.ajax({ // 利用ajax的get请求获取文本内容
            url: file_path,
            async: true,
            success: function (data) {
                let div = document.createElement("div");
                div.innerHTML = data;
                document.getElementById(by_id).appendChild(div); // 将模块渲染入主文件

                try {
                    call_func(true);
                }catch (e) {
                    view.log("可选回调函数没有设置。");
                }
            },
            error: function (error) {
                console.log("缺失模块htm文件=" + error);
                try {
                    call_func(false);
                }catch (e) {
                    view.log("可选回调函数没有设置。");
                }
            }
        });

    },
    "get_url_param": function (url, key) { // 获取url中的参数
        // 兼容模式url地址，例如：poop.html?page=3&ok=222#p=2#name=kd
        let url_str = "";
        if(!url){ url_str = window.location.href; } else {url_str = url; }
        let regExp = new RegExp("([?]|&|#)" + key + "=([^&|^#]*)(&|$|#)");
        let result = url_str.match(regExp);
        if (result) {
            return decodeURIComponent(result[2]); // 转义还原参数
        }else {
            return null; // 没有匹配的键即返回null
        }
    },
    "class_write_html": function (only_class_name, html) { // 根据唯一class写入html
        document.getElementsByClassName(only_class_name)[0].innerHTML = html;
    },
    "id_write_html": function (id_name, html) { // 根据唯一id写入html
        document.getElementById(id_name).innerHTML = html;
    },

};

