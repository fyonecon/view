
let kw_word = "";

function jump_location(engine, word, url) {
    let page_time = view.time_date("YmdWHis");
    let _word = '';

    // 1-匹配到外部链接
    if (view.string_include_string(word, "kws")!==-1){
        view.show_loading(0);
        kw_word=word;
        view.title("正在打开kws对应的内容");
        view.write_js(
            [kws_url+"kws.js?cache="+view.time_date("YmdHWis")], function (bool){
                try{
                    kws.load(kw_word);
                }catch (w){
                    view.notice_txt("外部js资源加载错误！", 10000);
                    view.title("外部js源加载错误！");
                };
                kw_word="";
            });
        return;
    }

    // 2-匹配展示本网站文字
    else if (word === "kw@bing"){
        $(".body").addClass("bg-white");
        view.hide_loading();
        $(".back-div").removeClass("hide");

        let domain = window.location.host;

        let show_txt = "http://"+domain+"/view/view.html?route=search&engine=bing&word=%s";
        $(".match-kw-span-msg").html("自定义必应搜索引擎（点击可复制）：");
        $(".match-kw-span-txt").html(show_txt).attr("data-clipboard-text", show_txt);

        view.title("请查看 kw 对应的内容");
        return;
    }
    else if (word === "kw@baidu"){
        $(".body").addClass("bg-white");
        view.hide_loading();
        $(".back-div").removeClass("hide");

        let domain = window.location.host;

        let show_txt = "http://"+domain+"/view/view.html?route=search&engine=baidu&word=%s";
        $(".match-kw-span-msg").html("自定义百度搜索引擎（点击可复制）：");
        $(".match-kw-span-txt").html(show_txt).attr("data-clipboard-text", show_txt);

        view.title("请查看 kw 对应的内容");
        return;
    }
    else if (word === "kw@google"){
        $(".body").addClass("bg-white");
        view.hide_loading();
        $(".back-div").removeClass("hide");

        let domain = window.location.host;

        let show_txt = "http://"+domain+"/view/view.html?route=search&engine=google&word=%s";
        $(".match-kw-span-msg").html("自定义Google搜索引擎（点击可复制）：");
        $(".match-kw-span-txt").html(show_txt).attr("data-clipboard-text", show_txt);

        view.title("请查看 kw 对应的内容");
        return;
    }

    // 3-匹配搜索引擎
    else {
        view.show_loading(0);

        let del_fake_news = " "
        del_fake_news = decodeURIComponent(del_fake_news)

        let _engine = "";

        try {
            _word = decodeURIComponent(word);
        }catch (e) {
            _word = word;
        }

        if (engine === "baidu"){
            url = "https://www.baidu.com/s?ie=utf-8";
            url = url + "&wd=" + _word + del_fake_news + "&page_time=" + page_time;
            _engine = "Baidu";
        }
        else if (engine === "bing"){
            url = "https://www.bing.com/?ensearch=1";
            url = url + "&q=" + _word + "&page_time=" + page_time;
            _engine = "Bing";
        }
        else if (engine === "google"){
            url = "https://www.google.com/search?q=";
            url = url + _word + "&page_time=" + page_time;
            _engine = "Google";
        }
        else if (engine === "duckduckgo"){
            url = "https://duckduckgo.com/?ia=web";
            url = url + "&q=" + _word + "&page_time=" + page_time;
            _engine = "DuckDuckGo";
        }
        else if (engine === "yandex"){
            url = "https://yandex.com/search/?text=";
            url = url+ _word + "&page_time=" + page_time;
            _engine = "Yandex";
        }
        else if (engine === "m_toutiao"){
            url = "https://m.toutiao.com/search/?keyword=";
            url = url + _word + "&page_time=" + page_time;
            _engine = "头条搜索";
        }
        else if (engine === "toutiao"){
            url = "https://www.toutiao.com/search/?keyword=";
            url = url + _word + "&page_time=" + page_time;
            _engine = "头条搜索";
        }
        else if (engine === "m_sogou"){
            url = "https://wap.sogou.com/web/searchList.jsp?from=index&keyword=";
            url = url + _word + "&page_time=" + page_time;
            _engine = "搜狗搜索";
        }
        else if (engine === "sogou"){
            url = "https://sogou.com/web?query=";
            url = url + _word + "&page_time=" + page_time;
            _engine = "搜狗搜索";
        }
        else if (engine === "weixin"){
            url = "https://weixin.sogou.com/weixin?type=2&s_from=input&ie=utf8&query=";
            url = url + _word + "&page_time=" + page_time;
            _engine = "微信文章搜索";
        }
        else if (engine === "music"){
            url = "https://www.hifini.com/search-";
            url = url + _word + "-1-1-1.htm?page_time=" + page_time;
            _engine = "Music搜索";
        }
        else if (engine === "video"){
            url = "https://www.bing.com/search?ensearch=1&q=tokyvideo+";
            url = url + _word + "&page_time=" + page_time;
            _engine = "Bing+Toky搜索";
        }
        else if (engine === "ipdomain"){
            url = "https://ipchaxun.com/";
            url = url + _word;
            _engine = "IP&网址";
        }
        else if (engine === "whois"){
            url = "https://www.whois.com/whois/";
            url = url + _word;
            _engine = "域名Whois";
        }
        else if (engine === "dpxz_download"){
            url = "http://s.uzzf.com/sousuo/pc/?k=";
            url = url + _word;
            _engine = "东坡下载";
        }
        else {
            view.alert_txt("engine参数为空，不能选择跳转的目标地址");
            view.log("/?route=search&engine=&word=");
            return;
        }

        view.title("Opening "+_word+ " " + " Using "+_engine);

    }

    window.location.replace(url);
}

function update_history(input_value){
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

function jump_to_search_engine(state) {
    view.log(state);
    let engine = ""; // 哪个搜索引擎
    let word = ""; // 搜索的关键词
    let url = "";

    engine = view.get_url_param("", "engine");
    try {
        word = view.get_url_param("", "word");
    }catch (e) {
        view.error(["可忽略的错误", e]);
        word = "";
    }
    update_history(word); // 更新历史

    if (!engine){
        let search_eq = view.get_cookie("search__eq");
        search_eq = 1*search_eq;

        if (search_eq === 0){
            engine = "bing";
        }
        else if (search_eq === 1){
            engine = "baidu";
        }
        else if (search_eq === 2){
            engine = "toutiao";
        }
        else if (search_eq === 3){
            engine = "google";
        }
        else if (search_eq === 4){
            engine = "duckduckgo";
        }
        else {
            engine = "bing";
        }

        view.log([word, engine, search_eq]);
    }else {
        view.log([engine]);
    }
    jump_location(engine, word, url);
}


// 复制文字
let clipboard = new Clipboard('.copy-txt-btn');
clipboard.on('success', function(e) {
    view.info('Action:', e.action);
    view.info('Text:', e.text);
    view.info('Trigger:', e.trigger);
    view.notice_txt("已复制");
    e.clearSelection();
});
clipboard.on('error', function(e) {
    view.error('Action:', e.action);
    view.error('Trigger:', e.trigger);
    view.notice_txt("复制失败！");
    try {call_func();}catch (e){}
});


function start_page(e) {
    view.log(e);
    jump_to_search_engine(1);
}

function show_page(){
    window.location.reload();
}
