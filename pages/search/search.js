
let kw_word = "";

function jump_location(engine, word, url) {
    let page_time = view.time_date("YmdWHis");
    let _word = '';

    if (view.string_include_string(word, "kws")!==-1){
        view.show_loading(0);
        kw_word=word;
        view.write_js([kw_url+"kw.js?cache="+view.time_date("YmdHWis")], function (){try{kws.load(kw_word);view.hide_loading();}catch (w){};kw_word="";});
        return;
    }

    // 1-匹配跳转
    if (word === "kw@首页" || word === "kw@home" ){
        url = "./";
    }
    else if (word === "kw@404"){
        url = "./?route=404";
    }
    else if (word === "kw@hei123"){
        url = "./?route=hei123";
    }

    // 2-匹配展示文字
    else if (word === "kw@bing"){
        view.hide_loading();
        $(".back-a").removeClass("hide");

        let show_txt = "https://so.ggvs.net/?route=search&engine=bing&word=%s";
        $(".match-kw-span-msg").html("自定义必应搜索引擎（点击可复制）：");
        $(".match-kw-span-txt").html(show_txt).attr("data-clipboard-text", show_txt);

        view.title("请查看kw对应的内容");
        return;
    }
    else if (word === "kw@baidu"){
        view.hide_loading();
        $(".back-a").removeClass("hide");

        let show_txt = "https://so.ggvs.net/?route=search&engine=baidu&word=%s";
        $(".match-kw-span-msg").html("自定义百度搜索引擎（点击可复制）：");
        $(".match-kw-span-txt").html(show_txt).attr("data-clipboard-text", show_txt);

        view.title("请查看kw对应的内容");
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

        if (engine === "baidu" || engine === "Baidu"){
            url = "https://www.baidu.com/s?ie=utf-8";
            url = url + "&wd=" + _word + del_fake_news + "&page_time=" + page_time;
            _engine = "百度一下";
        }
        else if (engine === "bing" || engine === "Bing"){
            url = "https://www.bing.com/?ensearch=1";
            url = url + "&q=" + _word + "&page_time=" + page_time;
            _engine = "必应搜索";
        }
        else if (engine === "google" || engine === "Google"){
            url = "https://www.google.com/search?q=";
            url = url + _word + "&page_time=" + page_time;
            _engine = "Google";
        }
        else if (engine === "duckduckgo" || engine === "DuckDuckGo"){
            url = "https://duckduckgo.com/?ia=web";
            url = url + "&q=" + _word + "&page_time=" + page_time;
            _engine = "DuckDuckGo";
        }
        else if (engine === "yandex" || engine === "Yandex"){
            url = "https://yandex.com/search/?text=";
            url = url+ _word + "&page_time=" + page_time;
            _engine = "Yandex";
        }
        else if (engine === "m-toutiao" || engine === "Toutiao"){
            url = "https://m.toutiao.com/search/?keyword=";
            url = url + _word + "&page_time=" + page_time;
            _engine = "头条搜索";
        }
        else if (engine === "toutiao" || engine === "Toutiao"){
            url = "https://www.toutiao.com/search/?keyword=";
            url = url + _word + "&page_time=" + page_time;
            _engine = "头条搜索";
        }
        else if (engine === "weixin" || engine === "Weixin"){
            url = "https://weixin.sogou.com/weixin?type=2&s_from=input&ie=utf8&query=";
            url = url + _word + "&page_time=" + page_time;
            _engine = "微信文章搜索";
        }
        else if (engine === "music"|| engine === "Music"){
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
        else {
            view.alert_txt("engine参数为空，不能选择跳转的目标地址");
            view.log("/?route=search&engine=&word=");
            return;
        }

        view.title("正在使用"+_engine+"打开 "+_word+"");

    }

    window.location.replace(url);
}


function jump_to_search_engine() {
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
    jump_to_search_engine();
}
