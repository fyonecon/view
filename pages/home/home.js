/*
 * 局部模块js
 * */
"use strict";

const search_debug = false; // 调试日志，false关闭日志，true显示日志
const page_title = ""; // 当前页面标题
const _search_jump = "";
const search = [ // 搜索引擎列表，分为移动和PC、前缀和后缀。自定义。
    {
        "name": "Bing",
        "m-url": "./?route=search&engine=bing&cache=_page_time_&word=",
        "pc-url": "./?route=search&engine=bing&cache=_page_time_&word=",
        "url_right": "",
    },
    {
        "name": "Baidu",
        "m-url": "./?route=search&engine=baidu&cache=_page_time_&word=",
        "pc-url": "./?route=search&engine=baidu&cache=_page_time_&word=",
        "url_right": "",
    },
    {
        "name": "Google", // 引擎名称，可视5个字
        "m-url": "./?route=search&engine=google&cache=_page_time_&word=", // 移动端，前缀
        "pc-url": "./?route=search&engine=google&cache=_page_time_&word=", // PC端，前缀
        "url_right": "", // 参数的固顶后缀
    },
    {
        "name": "DuckDuckGo", // 引擎名称，可视5个字
        "m-url": "./?route=search&engine=duckduckgo&cache=_page_time_&word=", // 移动端，前缀
        "pc-url": "./?route=search&engine=duckduckgo&cache=_page_time_&word=", // PC端，前缀
        "url_right": "", // 参数的固顶后缀
    },
    {
        "name": "Github",
        "m-url": "https://github.com/search?&type=Repositories&cache=_page_time_&q=",
        "pc-url": "https://github.com/search?&type=Repositories&cache=_page_time_&q=",
        "url_right": "",
    },

    // {
    //     "name": "Yandex", // 引擎名称，可视5个字
    //     "m-url": "./?route=search&engine=yandex&cache=_page_time_&word=", // 移动端，前缀
    //     "pc-url": "./?route=search&engine=yandex&cache=_page_time_&word=", // PC端，前缀
    //     "url_right": "", // 参数的固顶后缀
    // },
    // {
    //     "name": "头条搜索", // 引擎名称，可视5个字
    //     "m-url": "./?route=search&engine=m_toutiao&cache=_page_time_&word=", // 移动端，前缀
    //     "pc-url": "./?route=search&engine=toutiao&cache=_page_time_&word=", // PC端，前缀
    //     "url_right": "", // 参数的固顶后缀
    // },
    // {
    //     "name": "搜狗搜索", // 引擎名称，可视5个字
    //     "m-url": "./?route=search&engine=m_sogou&cache=_page_time_&word=", // 移动端，前缀
    //     "pc-url": "./?route=search&engine=sogou&cache=_page_time_&word=", // PC端，前缀
    //     "url_right": "", // 参数的固顶后缀
    // },
    {
        "name": "微信文章", // 引擎名称，可视5个字
        "m-url": "./?route=search&engine=weixin&cache=_page_time_&word=", // 移动端，前缀
        "pc-url": "./?route=search&engine=weixin&cache=_page_time_&word=", // PC端，前缀
        "url_right": "", // 参数的固顶后缀
    },
    {
        "name": "英文电影",
        "m-url": "./?route=search&engine=video&cache=_page_time_&word=",
        "pc-url": "./?route=search&engine=video&cache=_page_time_&word=",
        "url_right": "",
    },

    {
        "name": "收费音乐",
        "m-url": "./?route=search&engine=music&cache=_page_time_&word=",
        "pc-url": "./?route=search&engine=music&cache=_page_time_&word=",
        "url_right": "",
    },
    {
        "name": "英中翻译",
        "m-url": "https://fanyi.baidu.com/translate#en/zh/",
        "pc-url": "https://fanyi.baidu.com/translate#en/zh/",
        "url_right": "",
    },
    {
        "name": "中英翻译",
        "m-url": "https://fanyi.baidu.com/translate#zh/en/",
        "pc-url": "https://fanyi.baidu.com/translate#zh/en/",
        "url_right": "",
    },

    {
        "name": "东坡下载",
        "m-url": "./?route=search&engine=dpxz_download&cache=_page_time_&word=",
        "pc-url": "./?route=search&engine=dpxz_download&cache=_page_time_&word=",
        "url_right": "",
    },
    {
        "name": "查IP、域名",
        "m-url": "./?route=search&engine=ipdomain&cache=_page_time_&word=",
        "pc-url": "./?route=search&engine=ipdomain&cache=_page_time_&word=",
        "url_right": "",
    },
    {
        "name": "域名Whois",
        "m-url": "./?route=search&engine=whois&cache=_page_time_&word=",
        "pc-url": "./?route=search&engine=whois&cache=_page_time_&word=",
        "url_right": "",
    },

    // {
    //     "name": "查询IPv4",
    //     "m-url": "http://ip.tool.chinaz.com/",
    //     "pc-url": "http://ip.tool.chinaz.com/",
    //     "url_right": "",
    // },
    // {
    //     "name": "查询SEO",
    //     "m-url": "https://seo.chinaz.com/",
    //     "pc-url": "https://seo.chinaz.com/",
    //     "url_right": "",
    // },
    // {
    //     "name": "查询Whois",
    //     "m-url": "http://whois.chinaz.com/",
    //     "pc-url": "http://whois.chinaz.com/",
    //     "url_right": "",
    // },
    //
    // {
    //     "name": "CSDN博客",
    //     "m-url": "https://so.csdn.net/so/search/s.do?cache=_page_time_&q=",
    //     "pc-url": "https://so.csdn.net/so/search/s.do?cache=_page_time_&q=",
    //     "url_right": "",
    // },
    // {
    //     "name": "cnblogs博客",
    //     "m-url": "https://zzk.cnblogs.com/s/blogpost?cache=_page_time_&w=",
    //     "pc-url": "https://zzk.cnblogs.com/s/blogpost?cache=_page_time_&w=",
    //     "url_right": "",
    // },

];



// 调试日志
function console_log(txt) {
    search_debug === true ? console.info(txt) : "";
}

/*
 * 实现自定义的N次连续点击
 * many_click(_click_num, call_func)
 * 必填：_click_num 点击次数 [1, 10]
 * 必填：call_func 回调函数
 * 选填：_id 是长按手势传入的目标标签id
 * */
let click_before_time = 0;
let click_num = 0;

function many_click(_click_num, call_func, _id) {
    if (!call_func) { console.info("many_click(_click_num, call_func)无回调函数"); return; }
    if (_click_num === "long") { /*实现长按*/
        if (!_id) { console.info("_id为必填。many_click('long', call_func, _id)"); return; }
        long_press(_id, call_func);
        return;
    }
    // 安全校验
    if (typeof _click_num !== "number") { console.info("many_click(_click_num, call_func)的点击次数为number类型"); return; }
    // 处理click_num的新值情况
    if (click_num === 0) {
        click_num = _click_num;
    } else {
        if (click_num < 1 || click_num > 10) { click_num = 1; } /*只准1击至10击，其他情况默认1击*/
    }
    // 处理点击之时差
    let click_time = Date.parse(new Date()) + (new Date()).getMilliseconds(); // 毫秒时间戳
    if ((click_time - click_before_time) < 400) { // 下一次点击是否成功
        click_before_time = Date.parse(new Date()) + (new Date()).getMilliseconds();
        click_num--;
    } else { // 第一次点击
        click_before_time = Date.parse(new Date()) + (new Date()).getMilliseconds();
        if (click_num < _click_num) { /*清除历史不成功点击的参数*/
            click_num = _click_num;
        }
    }
    // N次成功点击后启用回调函数，并初始化click_num
    if (click_num === 1) {
        call_func("回调函数不需要传参");
        click_num = 0; /*初始化点击次数*/
    }
}

/*
 * 长按事件
 * long_press(_id, call_func)
 * */
function long_press(_id, call_func) {
    let timer = null;
    _id.addEventListener("touchstart", function() {
        timer = setTimeout(function() {
            call_func(_id);
        }, 1200); // 定义长按时间
    });
    _id.addEventListener("touchend", function() {
        clearTimeout(timer);
    });
}

// 二维码图位置<img class="qr_img" id="qr-img" />
// 使用call_func来获取<img class="qr_img" id="qr-img" />中src的值即可
function make_new_qr(content, width, height, call_func, id) {
    let _content = content ? content : "没有设置二维码参数";
    let _width = width ? width : 200;
    let _height = height ? height : 200;
    try {
        document.getElementById("qrcode").remove(); // 每次都移除老的
    } catch (e) {
        console_log("不存在qrcode-div节点，无法移除老QR");
    }
    let div = document.createElement("div");
    div.classList.add("qrcode");
    div.style.display = "none";
    div.setAttribute("id", "qrcode");
    document.getElementById("content").appendChild(div);
    let qrcode = new QRCode("qrcode", {
        text: _content,
        width: _width,
        height: _height,
        colorDark: "#000000",
        colorLight: '#f5f5f5',
        correctLevel: QRCode.CorrectLevel.L
    });

    setTimeout(function() {
        try {
            call_func(1, id);
        } catch (e) {
            console_log([call_func, id]);
        }
    }, 100);

}

function get_url_param(url, key) { // 获取url中的参数
    // 兼容模式url地址，例如：poop.html?page=3&ok=222#p=2#name=kd
    let url_str = "";
    if (!url) { url_str = window.location.href; } else { url_str = url; }
    let regExp = new RegExp("([?]|&|#)" + key + "=([^&|^#]*)(&|$|#)");
    let result = url_str.match(regExp);
    if (result) {
        return decodeURIComponent(result[2]); // 转义还原参数
    } else {
        return ""; // 没有匹配的键即返回空
    }
}

function timestamp() {
    return new Date().getTime();
}



const search_cookie_pre = "search_";
const search_eq = search_cookie_pre + "_eq";
let search_time_style = 0; // 自动校正iframe
let focus_time = 3 * 60 * 60 * 1000; // 保护用户输入框隐私，3h不聚焦删一次
let blur_time = 6 * 60 * 60 * 1000; // 保护用户输入框隐私，6h聚焦删一次
let dead_input_num = 0; // 自动初始化输入框

function set_search(val) { // 配置当前的搜索引擎
    console_log("配置当前搜索引擎");
    view.set_data(search_eq, val);
    for (let i = 0; i < document.getElementsByClassName("option").length; i++) {
        document.getElementsByClassName("option")[i].removeAttribute("selected");
    }
    document.getElementsByClassName("option-" + val)[0].setAttribute("selected", "selected");
    document.getElementsByTagName("title")[0].innerText = document.getElementsByClassName("option-" + val)[0].innerText + page_title;
}

function create_input(pre) { // 渲染模板
    console_log("渲染模板数据");

    document.getElementsByTagName("title")[0].innerText = page_title;
    let content = document.getElementsByClassName("content")[0];
    content.innerHTML = '<div class="input-div" id="input-div"><select class="select search-style select-none" id="select"></select><input type="text" value="" maxlength="500" autocomplete="off" id="input" class="input search-style"  placeholder="' + pre + txt_translate.input_placeholder[lang_eq] + '" title="输入搜索内容（支持kw@命令）"/><div class="clear"></div></div><div class="input-history-div" id="input-history"></div><div class="clear"></div><div class="search-btn-div" id="search-btn"></div><div class="res-div"></div>';
    let append_tag = [];
    for (let i = 0; i < search.length; i++) {
        let tag = '<option class="option option-' + i + '" value="' + i + '">' + search[i]["name"] + '</option>';
        append_tag.push(tag);
    }
    document.getElementsByClassName("select")[0].innerHTML = append_tag.join("");

    document.getElementById("input-div").classList.add("input-div-blur");

    let _eq = view.get_data(search_eq);
    if (_eq) { set_search(_eq); } else { set_search(0); }

    setTimeout(function() {
        delete_loading();
        write_tips_text('若浏览器阻止打开新标签，务必手动选择允许打开');
        // make_new_qr(window.location.href, 200, 200, show_qr, "img-show_qr");
    }, 300);

}

function dead_input(del_time) { // 处理清空用户输入的情况
    try {
        clearTimeout(dead_input_num);
        console_log(dead_input_num + "-清除成功");
    } catch (e) {
        console_log(dead_input_num + "-timeout is none");
    }
    dead_input_num = setTimeout(function() {
        create_input("重新");
        console_log(del_time);
    }, del_time);
    console_log(dead_input_num);
}

function run_search() { // 执行搜索
    let _input = document.getElementById("input").value;
    update_history(_input);
    change_blur();
    try {
        clearInterval(search_time_style);
    } catch (e) {
        console_log("第一次进入页面是没有定时器的");
    }
    let _select = document.getElementById("select");
    let engine = _select.options[_select.selectedIndex].value;
    let tab_url = "";

    if (!_input.trim()) {
        console_log("内容不能为空");
        view.notice_txt(txt_translate.keywords_null[lang_eq], 1500);
        change_focus();
        return;
    }

    let reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)+([A-Za-z0-9-~\/])/; // 至少是 http://a 这种格式
    if (!reg.test(_input)) {
        console_log("不是网址");

        _input = encodeURIComponent(_input);
        let url_right = search[engine]["url_right"].trim(); // 参数固定后缀
        let m_url = "";
        let pc_url = "";
        if (url_right === "blank") { // 对于有些网站，只能打开主页
            m_url = search[engine]["m-url"]; // get，移动端
            pc_url = search[engine]["pc-url"]; // get，PC端
        } else { // 正常搜索
            m_url = search[engine]["m-url"] + _input + url_right; // get，移动端
            pc_url = search[engine]["pc-url"] + _input + url_right; // get，PC端
        }

        if (window.innerWidth > 800) {
            write_tips_text("PC模式会自动打开新标签来展示搜索结果");
            tab_url = pc_url;
        } else {
            // 操作iOS设备Bug情况
            let u = navigator.userAgent;
            let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
            let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
            if (isAndroid === true || isiOS === false) { // android
                tab_url = m_url;
                console_log("Android");
            } else if (isAndroid === false || isiOS === true) { // ios
                console_log("iOS");
                write_tips_text("iOS移动设备会自动打开新标签来展示搜索结果");
                tab_url = m_url;
            } else { // pc
                tab_url = pc_url;
                console_log("PC");
            }
        }

        // 替换时间戳
        tab_url = tab_url.replaceAll("_page_time_", view.time_date("YmdHisW"));

    } else {
        console_log("是网址");

        tab_url = _input;
    }

    show_loading();
    write_tips_text('已经在新标签打开了本次搜索结果');
    change_blur(); // 主动退去键盘
    show_history();
    setTimeout(function() {
        delete_loading();
        document.getElementById("input").value = "";
    }, 1200);

    // 校验关键词
    try{
        let kw_state = home_kw(_input);
        if (kw_state){
            view.log("匹配到了关键词："+kw_state, _input);
        }else {
            view.log("未匹配到关键词："+kw_state, _input);
            window.open(tab_url, "_blank");
        }
    }catch (e){
        console.error(e);
        console.error("匹配关键词运行时报错", _input);
        window.open(tab_url, "_blank");
    }

}

function init_dom() {

    // 初始化页面输入框
    create_input("");

    // 初始化搜索按钮
    document.getElementById("search-btn").innerHTML = '' +
        //
        '<div class="search-btn-center do-btn-center must-btn select-none">' +
        '   <div class="search-btn-style history-btn-span click red" title="清空搜索历史记录" data-clipboard-text=" ">'+txt_translate.clear_history[lang_eq]+'</div>' +
        '   <div class="search-btn-style refresh-btn-span click " title="重新输入内容">'+txt_translate.reenter[lang_eq]+'</div>' +
        '   <div class="search-btn-style search-btn-span click" title="点击搜索">🔍'+txt_translate.search[lang_eq]+'</div>' +
        '   <div class="clear"></div>' +
        '</div>' +
        //
        // '<div class="search-btn-center do-btn-center must-btn select-none timeout-hide hide">' +
        // '   <span class="search-btn-style copy-btn-span click" onclick="clear_copy(this, \'copy-btn-span\')" data-clipboard-text="+86110">🎲·随机数</span>' +
        // '   <span class="search-btn-style color-btn-span click">🌓·<span id="change-color-span"></span></span>' +
        //
        // '   <div class="clear"></div>' +
        // '</div>' +
        //
        '<div class="swiper-container select-none">' +
        '    <div class="swiper-wrapper">' +

        //--
        '       <div class="swiper-slide more-btn">' +
        '       </div>' +

        //--
        '       <div class="swiper-slide more-btn">' +

        '           <div class="search-btn-center quick-btn-center">' +
        '              <span class="search-btn-style href-btn-span click"  data-href="https://cn.investing.com/rates-bonds/china-10-year-bond-yield">CN十年国债</span>' +
        '              <span class="search-btn-style href-btn-span click"  data-href="https://cn.investing.com/rates-bonds/u.s.-10-year-bond-yield">US十年国债</span>' +
        '              <span class="search-btn-style href-btn-span click"  data-href="https://cn.investing.com/indices/volatility-s-p-500">VIX恐慌</span>' +

        '              <div class="clear"></div>' +
        '           </div>' +

        '           <div class="search-btn-center quick-btn-center">' +
        '              <span class="search-btn-style href-btn-span click"  data-href="https://cn.investing.com/commodities/crude-oil">WTI原油</span>' +
        '              <span class="search-btn-style href-btn-span click"  data-href="https://cn.investing.com/currencies/us-dollar-index">美元指数</span>' +
        '               <span class="search-btn-style href-btn-span click"  data-href="https://danjuanapp.com/valuation-table/jiucai">股债利差</span>' +

        '              <div class="clear"></div>' +
        '           </div>' +

        '           <div class="search-btn-center quick-btn-center ">' +
        '              <span class="search-btn-style href-btn-span click"  data-href="https://www.huxiu.com/moment/">虎嗅7x24</span>' +
        '              <span class="search-btn-style href-btn-span click"  data-href="http://finance.sina.com.cn/7x24/">新浪7x24</span>' +
        '              <span class="search-btn-style href-btn-span click"  data-href="http://finance.sina.com.cn/stock/sl/#industry_1">新浪行业股</span>' +
        '              <div class="clear"></div>' +
        '           </div>' +

        '           <div class="search-btn-center quick-btn-center ">' +
        '              <span class="search-btn-style href-btn-span click"  data-href="https://m.ithome.com">IT之家</span>' +
        '              <span class="search-btn-style href-btn-span click"  data-href="https://www.v2ex.com/">V2EX</span>' +
        '              <span class="search-btn-style href-btn-span click"  data-href="http://www.ruanyifeng.com/blog/">阮一峰周刊</span>' +

        '              <div class="clear"></div>' +
        '           </div>' +

        '       </div>' +

        //--
        '       <div class="swiper-slide more-btn">' +

        '           <div class="search-btn-center quick-btn-center ">' +
        '              <span class="search-btn-style href-btn-span click"  data-href="https://www.youtube.com/">YouTube</span>' +
        '              <span class="search-btn-style href-btn-span click"  data-href="https://www.reddit.com/">Reddit</span>' +
        '              <span class="search-btn-style href-btn-span click"  data-href="https://twitter.com/">Twitter</span>' +
        '              <div class="clear"></div>' +
        '           </div>' +

        '           <div class="search-btn-center quick-btn-center">' +
        '               <span class="search-btn-style href-btn-span click" data-href="//t.bilibili.com">哔哩哔哩</span>' +
        '              <span class="search-btn-style href-btn-span click"  data-href="https://tv.cctv.com/epg/">CCTV节目单</span>' +
        '              <span class="search-btn-style href-btn-span click"  data-href="https://www.instagram.com/">Instagram</span>' +

        '              <div class="clear"></div>' +
        '           </div>' +

        '           <div class="search-btn-center quick-btn-center">' +
        '              <span class="search-btn-style href-btn-span click"  data-href="http://bbs.tianya.cn/list-free-1.shtml">天涯杂谈</span>' +
        '              <span class="search-btn-style href-btn-span click"  data-href="https://sspai.com/">少数派</span>' +
        '              <span class="search-btn-style href-btn-span click"  data-href="https://weibo.com/">微博</span>' +

        '              <div class="clear"></div>' +
        '           </div>' +

        '       </div>' +

        //--
        '       <div class="swiper-slide more-btn">' +
        '           <div class="search-btn-center quick-btn-center">' +
        '              <span class="search-btn-style href-btn-span click"  data-href="https://www.macupdate.com/">Mac软件下载</span>' +
        '              <span class="search-btn-style href-btn-span click"  data-href="https://finditandzip.ga/">油管视频下载</span>' +
        '              <span class="search-btn-style href-btn-span click"  data-href="https://cloudconvert.com/">音乐格式转换</span>' +
        '              <div class="clear"></div>' +
        '           </div>' +

        '           <div class="search-btn-center quick-btn-center">' +
        '              <span class="search-btn-style href-btn-span click"  data-href="https://outlook.live.com/mail/0/">Outlook</span>' +
        '              <span class="search-btn-style href-btn-span click"  data-href="https://mail.google.com/">Gmail</span>' +
        '              <span class="search-btn-style href-btn-span click"  data-href="https://mail.yahoo.com/">Yahoo！</span>' +
        '              <div class="clear"></div>' +
        '           </div>' +

        '           <div class="search-btn-center quick-btn-center ">' +
        '              <span class="search-btn-style href-btn-span click"  data-href="https://onedrive.live.com/">OneDrive</span>' +
        '              <span class="search-btn-style href-btn-span click"  data-href="https://beta.icloud.com/">iCloud+</span>' +
        '              <span class="search-btn-style href-btn-span click"  data-href="https://www.windy.com/">Windy</span>' +
        '              <div class="clear"></div>' +
        '           </div>' +

        '           <div class="search-btn-center quick-btn-center">' +
        '              <span class="search-btn-style href-btn-span click"  onclick="show_full_screen(this) " data-href="https://didayu.cn/updates/win10/index.htm">🐟Win加载</span>' +
        '              <span class="search-btn-style href-btn-span click"  onclick="show_full_screen(this) " data-href="https://didayu.cn/updates/apple/index.htm">🐟Mac加载</span>' +


        '              <div class="clear"></div>' +
        '           </div>' +

        '       </div>' +

        //--
        '       <div class="swiper-slide more-btn">' +

        '           <div class="search-btn-center quick-btn-center ">' +
        '              <span class="search-btn-style href-btn-span click" data-href="https://m.ximalaya.com/waiyu/44962493/">越语入门</span>' +
        '              <span class="search-btn-style href-btn-span click"  data-href="https://active.clewm.net/FwC95g?qrurl=http://qr35.cn/FwC95g&gtype=1&key=2fba516c7fe81e21f08824a04e2676d2f8043b2870">越语基础</span>' +

        '              <div class="clear"></div>' +
        '           </div>' +

        '           <div class="search-btn-center quick-btn-center ">' +
        '              <span class="search-btn-style href-btn-span click" data-href="https://learnku.com/docs/the-way-to-go/187-file/3736">Go入门指南L</span>' +
        '              <span class="search-btn-style href-btn-span click"  data-href="https://www.kancloud.cn/kancloud/the-way-to-go/81390">Go入门指南K</span>' +
        '              <span class="search-btn-style href-btn-span click"  data-href="https://learnku.com/docs/effective-go/2020/introduction/6236">Go高效编程</span>' +

        '              <div class="clear"></div>' +
        '           </div>' +

        '           <div class="search-btn-center quick-btn-center ">' +
        '              <span class="search-btn-style href-btn-span click"  data-href="http://c.biancheng.net/view/124.html">Go教程C</span>' +
        '              <span class="search-btn-style href-btn-span click" data-href="https://learnku.com/docs/gorm/v2/index/9728">GORM文档</span>' +
        '              <span class="search-btn-style href-btn-span click" data-href="https://www.tizi365.com/archives/244.html">Gin文档</span>' +

        '              <div class="clear"></div>' +
        '           </div>' +

        '       </div>' +

        //--
        '       <div class="swiper-slide more-btn hide">' +
        '           <div class="search-btn-center quick-btn-center">' +
        '              <div class="clear"></div>' +
        '           </div>' +
        '       </div>' +

        //--
        '    </div>' +

        '    <div class="swiper-pagination hide"></div>' +
        '    <div class="swiper-button-next hide"></div>' +
        '    <div class="swiper-button-prev hide"></div>' +

        '</div>' +
        //
        '<div class="clear"></div>';

    // 各种按钮事件绑定
    document.getElementsByClassName("input")[0].addEventListener("mouseover", function(e) {
        console_log("鼠标over了输入框，输入框自动聚焦");
        let that = this;
        that.focus();
    });
    document.getElementById("select").onchange = function(e) { // 设置历史和当前选中的搜索引擎
        console_log("选择搜素引擎");
        let that = this;
        set_search(that.value);
    };
    document.getElementById("input").onfocus = function(e) {
        console_log("监听输入框状态-onfocus");
        document.getElementsByClassName("select")[0].classList.add("liner-color");
        document.getElementById("input-div").classList.remove("input-div-blur");
        document.getElementById("input-div").classList.add("input-div-focus");
        dead_input(focus_time);
    };
    document.getElementById("input").onblur = function(e) {
        console_log("监听输入框状态-onblur");
        document.getElementsByClassName("select")[0].classList.remove("liner-color");
        document.getElementById("input-div").classList.remove("input-div-focus");
        document.getElementById("input-div").classList.add("input-div-blur");
        dead_input(blur_time);
    };

    /*判断用户输入完成后按Enter可执行搜索*/
    // 判断用户输入框是否已经输入完成
    // 参考：https://www.lmlphp.com/user/57788/article/item/2030617/
    let input_doing = 1; // 1直接完成输入，2预选词输入完成，-1开始输入，0词预选状态。1和2都是输入完成，请区分具体数值。
    document.getElementsByClassName("input")[0].addEventListener('compositionstart',function(e){
        input_doing = -1;
        view.info(input_doing);
    },false);
    document.getElementsByClassName("input")[0].addEventListener('input',function(e){
        if (input_doing === -1){ // 词预选状态
            input_doing = 0;
        }
        else if (input_doing === 1 || input_doing === 2) { // 直接输入状态，顺便初始化input_doing
            input_doing = 1;
        }
        else {
            input_doing = 0;
        }
        view.info(input_doing);
    },false);
    document.getElementsByClassName("input")[0].addEventListener('compositionend',function(e){
        if (input_doing === 0){ // 预选词已确定时触发
            input_doing = 2;
        }else if (input_doing === 1) { // 输入完成时触发
            input_doing = 1;
        }else {
            input_doing = 0;
        }
        view.info(input_doing);
    },false);
    let db_click_time = (new Date()).getTime();
    document.onkeyup = function(event) { // Enter
        console_log("Enter搜素");
        let now_click_time = (new Date()).getTime();

        let _key = event.key;
        if (_key === "Enter") {
            let click_time = now_click_time*1 - db_click_time*1
            if (click_time <= 100) {
                db_click_time = 0;
                return;
            } else {
                db_click_time = (new Date()).getTime();
            }

            let _input = document.getElementById("input").value;
            if (!_input.trim()) {
                console_log("内容不能为空");
                view.notice_txt(txt_translate.keywords_null[lang_eq], 1500);
                change_focus();
                return;
            }

            // 判断输入框是否已经完成输入，避免词还没选择完就触发enter键搜索
            if (input_doing === 1){
                view.log("输入词完成状态触发enter键搜索："+input_doing);
                // 输出状态判断完成，执行搜索
                view.show_mask(200);
                run_search();
            }else if (input_doing === 2) {
                view.log("连续输入词预选状态不触发enter键搜索："+input_doing);
                input_doing = 1; // 不输入就初始化输入状态值
            }else {
                view.log("未知输入状态1："+input_doing);
            }
        }else{
            if (input_doing === 2){
                input_doing = 1;
            }else {
                view.log("未知输入状态2："+input_doing);
            }
        }
    };
    /**********/

    document.getElementsByClassName("search-btn-span")[0].addEventListener("click", function() {
        view.show_mask(200);
        run_search();
    });

    // document.getElementById("content-bg").addEventListener("click", function() {
    //     many_click(4, change_bg_color());
    // });
    document.getElementsByClassName("history-btn-span")[0].addEventListener("click", function() {
        let that = this;
        let ok= window.confirm("\n ⚠ "+txt_translate.clear_history_alert[lang_eq]+" \n");
        if (ok === true){ // OK
            view.show_mask(400);
            clear_history();
            document.getElementById("input").value = "";
            clear_copy(that, "history-btn-span");
        } else { // 取消
            view.alert_txt(txt_translate.cancel_doing[lang_eq], 1000);
            clear_copy(that, "history-btn-span");
        }
    });
    document.getElementsByClassName("refresh-btn-span")[0].addEventListener("click", function() {
        view.show_mask(200);
        document.getElementById("input").value = "";
        // view.notice_txt("已清空输入框", 600);
        change_focus();
        // setTimeout(function (){
        //     let now_url = window.location.href;
        //     window.location.replace(now_url);
        // }, 100);
    });

    // 确定适应屏
    window.onresize = function() {
        let _width = window.innerWidth;
        let _screen_width = screen.width;
        resize_width(_width, _screen_width);
    };
    let width = window.innerWidth;
    let screen_width = screen.width;
    resize_width(width, screen_width);

    setTimeout(function() {
        try {
            document.getElementsByClassName("href-btn-center")[0].classList.add("hide");
        } catch (e) {
            console_log("跳过，-2");
        }
    }, 4000);

    setTimeout(function (){
        make_swiper();
    }, 100);

}

/*
*  处理历史记录
* */
$(document).on("click", ".history-span", function (){
    let that = $(this);
    let data = that.attr("data-history");
    document.getElementById("input").value = data;
    // run_search();
});

function show_history(){
    let data_key = "input_history";
    let array_key = "@=history=@";

    $("#input-history").html("");

    let data_string = view.get_data(data_key)
    // 限制历史记录长度
    let len = 30;
    let array_history = data_string.split(array_key)
    for (let i=0; i<len; i++){
        let the_history = array_history[i];
        if (the_history){
            let span = '<div class="history-span click select-none blue" data-history="'+the_history+'" title="'+the_history+'" data-title="'+the_history+'">'+(array_history.length-1-i)+'#'+the_history+'</div>'
            $("#input-history").append(span);
        }
    }
}
function update_history(input_value){
    // let input_history = document.getElementById("input-history");
    // let input_value = document.getElementById("input").value;

    let data_key = "input_history";
    let array_key = "@=history=@";

    if (input_value){
        let data_string = view.get_data(data_key)
        // 去重历史记录
        if (view.string_include_string(data_string, input_value+"@=") !== -1){
            view.log("已存在历史记录：" + input_value);
        }else {
            // 限制历史记录长度
            let len = 30;
            let array_history = data_string.split(array_key)
            let new_data_string = "";
            for (let i=0; i<array_history.length; i++){
                let the_history = array_history[i];
                if (i<len){
                    new_data_string = the_history + array_key;
                    let new_data = input_value + array_key + data_string;
                    view.set_data(data_key, new_data)
                }
            }
        }

    }else {
        view.log("input_value不能为空")
    }

}
function clear_history(){
    $("#input-history").html("");
    let data_key = "input_history";
    return view.del_data(data_key);
}

/*
 *  个性化颜色
 * */
const bg_cookie = search_cookie_pre + "bg_color";

function init_color() {
    let bg_color = view.get_data(bg_cookie);
    if (bg_color === null || bg_color === ""){ // 默认颜色（根据浏览器主题默认颜色）
        let color_model = view.scheme_model();
        if (color_model === "light"){ // light
            bg_color = 0; // 默认色
        }else { // dark
            bg_color = 2;
        }
        // view.set_data(bg_cookie, bg_color);
    }else {
        bg_color = bg_color * 1;
    }

    let change_color_span = document.getElementById("change-color-span");
    let body = document.getElementsByClassName("body")[0];
    let select = document.getElementsByTagName("select")[0];
    let input = document.getElementsByTagName("input")[0];
    console_log("设置色：" + bg_color);

    if (bg_color === 0) { // 亮
        change_color_span.innerHTML = "雪白";

        body.classList.add("bg-light");
        body.classList.remove("bg-black");
        body.classList.remove("bg-grey");
        body.classList.remove("bg-yellow");
        body.classList.remove("bg-ivory");

        select.classList.add("select-color-light");
        input.classList.add("input-color-light");
        select.classList.remove("select-color-black");
        input.classList.remove("input-color-black");
        select.classList.remove("select-color-grey");
        input.classList.remove("input-color-grey");
        select.classList.remove("select-color-yellow");
        input.classList.remove("input-color-yellow");
        select.classList.remove("select-color-ivory");
        input.classList.remove("input-color-ivory");
    }
    else if (bg_color === 1) { // 暗
        change_color_span.innerHTML = "昏黑";

        body.classList.remove("bg-light");
        body.classList.add("bg-black");
        body.classList.remove("bg-grey");
        body.classList.remove("bg-yellow");
        body.classList.remove("bg-ivory");

        select.classList.remove("select-color-light");
        input.classList.remove("input-color-light");
        select.classList.add("select-color-black");
        input.classList.add("input-color-black");
        select.classList.remove("select-color-grey");
        input.classList.remove("input-color-grey");
        select.classList.remove("select-color-yellow");
        input.classList.remove("input-color-yellow");
        select.classList.remove("select-color-ivory");
        input.classList.remove("input-color-ivory");
    }
    else if (bg_color === 2) { // 灰
        change_color_span.innerHTML = "岩灰";

        body.classList.remove("bg-light");
        body.classList.remove("bg-black");
        body.classList.add("bg-grey");
        body.classList.remove("bg-yellow");
        body.classList.remove("bg-ivory");

        select.classList.remove("select-color-light");
        input.classList.remove("input-color-light");
        select.classList.remove("select-color-black");
        input.classList.remove("input-color-black");
        select.classList.add("select-color-grey");
        input.classList.add("input-color-grey");
        select.classList.remove("select-color-yellow");
        input.classList.remove("input-color-yellow");
        select.classList.remove("select-color-ivory");
        input.classList.remove("input-color-ivory");
    }

    else if (bg_color === 3) { // 黄
        change_color_span.innerHTML = "夕黄";

        body.classList.remove("bg-light");
        body.classList.remove("bg-black");
        body.classList.remove("bg-grey");
        body.classList.add("bg-yellow");
        body.classList.remove("bg-ivory");

        select.classList.remove("select-color-light");
        input.classList.remove("input-color-light");
        select.classList.remove("select-color-black");
        input.classList.remove("input-color-black");
        select.classList.remove("select-color-grey");
        input.classList.remove("input-color-grey");
        select.classList.add("select-color-yellow");
        input.classList.add("input-color-yellow");
        select.classList.remove("select-color-ivory");
        input.classList.remove("input-color-ivory");
    }
    else if (bg_color === 4) { // 象牙
        change_color_span.innerHTML = "牙白";

        body.classList.remove("bg-light");
        body.classList.remove("bg-black");
        body.classList.remove("bg-grey");
        body.classList.remove("bg-yellow");
        body.classList.add("bg-ivory");

        select.classList.remove("select-color-light");
        input.classList.remove("input-color-light");
        select.classList.remove("select-color-black");
        input.classList.remove("input-color-black");
        select.classList.remove("select-color-grey");
        input.classList.remove("input-color-grey");
        select.classList.remove("select-color-yellow");
        input.classList.remove("input-color-yellow");
        select.classList.add("select-color-ivory");
        input.classList.add("input-color-ivory");
    } else { // 默认
        view.alert_txt("无默认颜色，无法渲染")
    }
}

function change_bg_color() {
    let bg_color = view.get_data(bg_cookie);
    if (bg_color === null || bg_color === ""){ // 默认颜色
        let color_model = view.scheme_model();
        if (color_model === "light"){ // light
            bg_color = 4;
        }else { // dark
            bg_color = 2;
        }
        // view.set_data(bg_cookie, bg_color);
    }else {
        bg_color = bg_color * 1;
    }

    // 0=bg-light；1=bg-black；2=bg-yellow；
    if (bg_color === 0) { // 切换到第二个
        view.set_data(bg_cookie, (bg_color + 1));
    }
    else if (bg_color === 1) { // 切换到第三个
        view.set_data(bg_cookie, (bg_color + 1));
    }
    else if (bg_color === 2) { // 切换到第四个
        view.set_data(bg_cookie, (bg_color + 1));
    }
    else if (bg_color === 3) { // 切换到第5个
        view.set_data(bg_cookie, (bg_color + 1));
    }
    else if (bg_color === (bg_color + 1)) { //  // 切换到第一个
        view.set_data(bg_cookie, 0);
    }
    else { // 默认为0
        view.set_data(bg_cookie, 0);
    }

    init_color();
}

function change_focus() {
    document.getElementById("input").focus();
}

function change_blur() {
    document.getElementById("input").blur();
}

// 调整屏幕宽度变化时的页面展示适应性
function resize_width(width, screen_width) {
    console_log(width);

    // if (width < 400){
    //     document.getElementsByClassName("body")[0].classList.add("zoom-80");
    // }else {
    //     document.getElementsByClassName("body")[0].classList.remove("zoom-80");
    // }

    try {
        if (width < 1200) {
            document.getElementsByClassName("href-btn-center")[0].classList.add("hide");
        } else {
            document.getElementsByClassName("href-btn-center")[0].classList.remove("hide");
            setTimeout(function() {
                document.getElementsByClassName("href-btn-center")[0].classList.add("hide");
            }, 4000);
        }
    } catch (e) {
        console_log("跳过，-1");
    }

}

/*
 * 提醒
 * */
function write_tips_text(text) {
    document.getElementsByClassName("res-div")[0].innerHTML = '<div class="flex-center tips-div select-none hide" ><div class="res-txt">' + text + '</div></div>';
}

function show_loading() {
    console_log("展示遮蔽层");
    document.getElementById("loading-div").classList.remove("hide");
}

function delete_loading() {
    console_log("删除遮蔽层");
    document.getElementById("loading-div").classList.add("hide");
}

function href_ext(that) {
    let el_href = that.attr("data-href");
    console_log(el_href);

    if (el_href) {
        window.open(el_href, "_blank");
    } else {
        view.alert_txt("参数不能为空", 2000);
        console_log("参数不能为空");
    }
}

//
function make_swiper(){
    let swiper = new Swiper('.swiper-container', {
        autoHeight: true, //enable auto height
        spaceBetween: 200,
        //loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) { // 底部数字
                return '<span class="' + className + '">' + (index + 1) + '</span>';
            },
        },
        keyboard: { // 键盘方向键控制
            enabled: true,
        },
        // mousewheel: true, // 鼠标滚轮控制
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    setTimeout(function (){
        $(".swiper-pagination").addClass("hide");
        $(".timeout-hide").css("opacity", "0");
    }, 10);

}

//
function clear_copy(that, _class){
    // view.notice_txt(view.read_clipboard());

    let clipboard = new Clipboard("."+_class);
    clipboard.on('success', function(e) {
        // console.info('Action:', e.action);
        // console.info('Text:', e.text);
        // console.info('Trigger:', e.trigger);
        // view.alert_txt("已生成随机数到粘贴板", 1200);
        e.clearSelection();
    });
    clipboard.on('error', function(e) {
        // console.error('Action:', e.action);
        // console.error('Trigger:', e.trigger);
        // view.alert_txt("粘贴板操作失败", 800);
    });

}

function timer1() {
    let time_txt = view.time_date('Y-m-d W H:i:s');
    document.getElementsByClassName("timer-span")[0].innerHTML = time_txt;
}

// 打开全屏
function show_full_screen(that){
    view.open_full_screen("full-div");
    let href = that.getAttribute("data-href");
    setTimeout(function (){
        view.xss_iframe("full-div", href);
    }, 100);
}
// 关闭全屏
function close_full_screen(){
    view.log('退出全屏')
    view.close_full_screen();
    setTimeout(function (){
        view.del_xss_iframe("full-div");
    }, 100);
}

function change_color_state(){
    change_bg_color();
}

// 节能模式
function battery_model(){
    if (window.innerWidth < 640){
        //
        view.log("当前节能模式：「移动端跳过」");
        $(".switch-battery_state").removeClass("hide").html("🔋"+txt_translate.battery_on[lang_eq]);
    }else{
        if (view.get_switch_state("battery_state") === "Off"){
            view.log("当前节能模式：关闭");
            $(".switch-battery_state").removeClass("hide").html("🪫"+txt_translate.battery_off[lang_eq]);
            view.write_js([cdn_page_file+"parts/bg_animate/bg_animate.js"+"?"+page_time]);
        }else {
            view.log("当前节能模式：打开");
            $(".switch-battery_state").removeClass("hide").html("🔋"+txt_translate.battery_on[lang_eq]);
        }
    }
}

// 手动切换节能模式
function switch_battery_state(){
    let msg = view.set_switch_state("battery_state");
    // view.alert_txt("节能模式："+msg, 3000);
    view.refresh_page(100);
}

// 整点报时开关
function switch_hour_state(){
    let msg = view.set_switch_state("hour_state");
    hour_model();
}
// 初始化整点按钮显示
function hour_model(){
    let msg = view.get_switch_state("hour_state");
    if (msg === "Off"){
        $(".switch-hour_state").html("⏰"+"整点报时：已关");
    }else {
        $(".switch-hour_state").html("⏰"+"整点报时：已开");
    }
}
// 整点报时，仅每小时
function on_hour(){
    let _state = view.get_switch_state("hour_state");
    if (_state === "Off"){
        // view.log("已跳过整点报时");
    }else {
        let minute = view.time_date("i")*1;
        let second = view.time_date("s")*1;
        if (minute === 0 && second < 30){ // 注意此处的重复引用的问题
            view.log("整点报时");
            speak_time();
        }
    }
}

// 语音报时，隔8s才能运行下一次
let speak_time_num = 0;
let speak_time_out;
function speak_time(){
    let txt = view.time_date("现在时间，H点i分");
    clearTimeout(speak_time_out);
    if (speak_time_num === 0){
        view.voice(txt);
        view.log("整点报时1");
        speak_time_num = 1;
        speak_time_out = setTimeout(function (){
            speak_time_num = 0;
            view.log("整点报时=+0");
        }, 8000);
    }else{
        speak_time_out = setTimeout(function (){
            speak_time_num = 0;
            view.log("整点报时=-0");
        }, 8000);
    }
}

$(document).on("click", ".href-btn-span", function (){
    let that = $(this);
    view.show_mask(200);
    href_ext(that);
});
$(document).on("click", ".qr-div", function (){
    let that = $(this);
    if (that.hasClass("qr-60")){
        that.removeClass("qr-60").addClass("qr-20");
    }else if (that.hasClass("qr-20")) {
        that.removeClass("qr-20").addClass("qr-60");
    }
});
$(document).on("click", ".color-btn-span", function (){
    let that = $(this);
    view.show_mask(200);
    change_color_state();
});
$(document).on("click", ".switch-battery_state", function (){
    let that = $(this);
    view.show_mask(200);
    switch_battery_state();
});
$(document).on("click", ".switch-hour_state", function (){
    let that = $(this);
    view.show_mask(200);
    switch_hour_state();
});
$(document).on("click", ".timer-span", function (){
    let that = $(this);
    // view.show_mask(200);
    // speak_time();
});

let timer1_interval; // 时钟

// 翻译
const txt_translate = {
    clear_history_alert: [ "清空历史记录 ？", "Clear All History ? "],
    clear_history: ["清空历史", "Clear"],
    reenter:  ["重新输入", "Rewrite"],
    search:  ["搜 索", "Search"],
    input_placeholder:  ["输入搜索关键词", "Enter Search Keywords"],
    keywords_null:  ["搜索内容不能为空", "The Search Content Cannot Be Empty"],
    cancel_doing:  ["已取消操作", "Operation Canceled"],
    battery_on:  ["节能：已开", "Energy Conservation: ON"],
    battery_off:  ["节能：已关", "Energy Conservation: OFF"],
    clear_illegal_dom: ["非法节点已清除", "Illegal Nodes Cleared"],
}
view.set_html_lang();

function start_page(info) {
    view.log(info);
    // view.log("主框架解析完成，开始渲染模块页面 > >");

    // $(".rights-div").removeClass("hide");
    $(".timer-div").removeClass("hide");
    if (screen.width > 640){ // PC
        // $(".qr-div").removeClass("hide");
        // $(".change-color-div").removeClass("hide");
        // $(".on-hour-div").removeClass("hide");
        // setTimeout(function (){
        //     $(".swiper-container").addClass("hide");
        // },200);
        // $(".contact-div").removeClass("hide");
        $(".battery-model-div").removeClass("hide");
    }else { // m
        // $(".qr-div").removeClass("hide");
        // $(".timer-div").removeClass("hide");
    }

    init_dom();
    init_color();
    delete_loading();

    show_history();
    close_full_screen();

    clearInterval(timer1_interval);
    timer1();
    timer1_interval = setInterval(function () {
        timer1();
        on_hour();
    }, 1000);

    battery_model();
    hour_model();

    make_new_qr(window.location.href, 200, 200, function (){
        let src = $(".qr_img").attr("src");
        if (src){$(".new-qr-img").attr("src", src);}
    }, "qr-div");

    $(".icp-a-show").html($(".icp-a").text()).attr("href", $(".icp-a").attr("href"));
    $(".rights-a").html("© "+app_name);
    $(".rights-date").html(view.time_date("Y"));
    $(".email-a").html("📮 "+app_email);

    // dom重新渲染
    setTimeout(function (){
        let swiper_container_show = view.get_data("swiper_container_show");
        if (swiper_container_show === "show"){ // show
            $(".swiper-container").removeClass("hide");
        }else { // hide
            $(".swiper-container").addClass("hide");
        }
    }, 200);

}

function hide_page(){
    view.log("后台状态，清除定时器");
    clearInterval(timer1_interval);
}

function show_page(){
    view.log("前台状态，重新开启定时器");
    timer1();
    timer1_interval = setInterval(function () {
        timer1();
        on_hour();
    }, 1000);
}

function page_color(e){
    init_color();
}