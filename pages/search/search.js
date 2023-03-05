

function jump_location(engine, word, url) {
    let page_time = view.get_date()[0];
    let _word = '';

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

        return;
    }
    else if (word === "kw@baidu"){
        view.hide_loading();
        $(".back-a").removeClass("hide");

        let show_txt = "https://so.ggvs.net/?route=search&engine=baidu&word=%s";
        $(".match-kw-span-msg").html("自定义百度搜索引擎（点击可复制）：");
        $(".match-kw-span-txt").html(show_txt).attr("data-clipboard-text", show_txt);

        return;
    }

    // 3-匹配搜索引擎
    else {
        view.show_loading(0);

        let del_fake_news = " "
        del_fake_news = decodeURIComponent(del_fake_news)

        try {
            _word = decodeURIComponent(word);
        }catch (e) {
            _word = word;
        }

        if (engine === "baidu"){
            url = "https://www.baidu.com/s?ie=utf-8";
            url = url + "&wd=" + _word + del_fake_news + "&page_time=" + page_time;
        }
        else if (engine === "bing"){
            url = "https://www.bing.com/?ensearch=1";
            url = url + "&q=" + _word + "&page_time=" + page_time;
        }
        else if (engine === "google"){
            url = "https://www.google.com/search?q=";
            url = url + _word + "&page_time=" + page_time;
        }
        else if (engine === "duckduckgo"){
            url = "https://duckduckgo.com/?ia=web";
            url = url + "&q=" + _word + "&page_time=" + page_time;
        }
        else if (engine === "yandex"){
            url = "https://yandex.com/search/?text=";
            url = url+ _word + "&page_time=" + page_time;
        }
        else if (engine === "m-toutiao"){
            url = "https://m.toutiao.com/search/?keyword=";
            url = url + _word + "&page_time=" + page_time;
        }
        else if (engine === "toutiao"){
            url = "https://www.toutiao.com/search/?keyword=";
            url = url + _word + "&page_time=" + page_time;
        }
        else if (engine === "weixin"){
            url = "https://weixin.sogou.com/weixin?type=2&s_from=input&ie=utf8&query=";
            url = url + _word + "&page_time=" + page_time;
        }
        else if (engine === "music"){
            url = "https://www.hifini.com/search-";
            url = url + _word + "-1-1-1.htm?page_time=" + page_time;
        }
        else if (engine === "video"){
            url = "https://www.bing.com/search?ensearch=1&q=tokyvideo+";
            url = url + _word + "&page_time=" + page_time;
        }
        else if (engine === "ipdomain"){
            url = "https://ipchaxun.com/";
            url = url + _word;
        }
        else {
            view.alert_txt("engine参数为空，不能选择跳转的目标地址");
            view.log("/?route=search&engine=&word=");
            return;
        }

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
