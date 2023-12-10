
let kw_word = "";
const search_url= "http://view.ggvs.net/view/view.html";

function jump_location(engine, word, url) {
    let page_time = view.time_date("YmdWHi00");
    let _word = '';

    // 1-匹配到外部链接
    if (view.string_include_string(word, "kws")!==-1){
        view.show_loading(0);
        kw_word=word;
        view.title("正在打开kws对应的内容");
        view.write_js(
            [cdn_page_file+".cache/js/kws.js?cache="+view.time_date("YmdHWi")], function (bool){
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

        let show_txt = search_url + "?route=search&engine=bing&word=%s";
        $(".match-kw-span-msg").html("自定义必应搜索引擎（点击可复制）：");
        $(".match-kw-span-txt").html(show_txt).attr("data-clipboard-text", show_txt);

        view.title("请查看 kw 对应的内容");
        return;
    }
    else if (word === "kw@baidu"){
        $(".body").addClass("bg-white");
        view.hide_loading();
        $(".back-div").removeClass("hide");

        let show_txt = search_url + "?route=search&engine=baidu&word=%s";
        $(".match-kw-span-msg").html("自定义百度搜索引擎（点击可复制）：");
        $(".match-kw-span-txt").html(show_txt).attr("data-clipboard-text", show_txt);

        view.title("请查看 kw 对应的内容");
        return;
    }
    else if (word === "kw@google"){
        $(".body").addClass("bg-white");
        view.hide_loading();
        $(".back-div").removeClass("hide");

        let show_txt = search_url + "?route=search&engine=google&word=%s";
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

        let name = "";

        try {
            _word = decodeURIComponent(word);
        }catch (e) {
            _word = word;
        }

        if (engine === "baidu"){
            url = "https://www.baidu.com/s?ie=utf-8";
            url = url + "&wd=" + _word + del_fake_news + "&page_time=" + page_time;
            name = "Baidu";
        }
        else if (engine === "bing"){
            url = "https://www.bing.com/?ensearch=1";
            url = url + "&q=" + _word + "&page_time=" + page_time;
            name = "Bing";
        }
        else if (engine === "google"){
            url = "https://www.google.com/search?q=";
            url = url + _word + "&page_time=" + page_time;
            name = "Google";
        }
        else if (engine === "duckduckgo"){
            url = "https://duckduckgo.com/?ia=web";
            url = url + "&q=" + _word + "&page_time=" + page_time;
            name = "DuckDuckGo";
        }
        else if (engine === "yandex"){
            url = "https://yandex.com/search/?text=";
            url = url+ _word + "&page_time=" + page_time;
            name = "Yandex";
        }
        else if (engine === "m_toutiao"){
            url = "https://m.toutiao.com/search/?keyword=";
            url = url + _word + "&page_time=" + page_time;
            name = "头条搜索";
        }
        else if (engine === "toutiao"){
            url = "https://www.toutiao.com/search/?keyword=";
            url = url + _word + "&page_time=" + page_time;
            name = "头条搜索";
        }
        else if (engine === "m_sogou"){
            url = "https://wap.sogou.com/web/searchList.jsp?from=index&keyword=";
            url = url + _word + "&page_time=" + page_time;
            name = "搜狗搜索";
        }
        else if (engine === "sogou"){
            url = "https://sogou.com/web?query=";
            url = url + _word + "&page_time=" + page_time;
            name = "搜狗搜索";
        }
        else if (engine === "weixin"){
            url = "https://weixin.sogou.com/weixin?type=2&s_from=input&ie=utf8&query=";
            url = url + _word + "&page_time=" + page_time;
            name = "微信文章搜索";
        }
        else if (engine === "music"){
            url = "https://www.hifini.com/search-";
            url = url + _word + "-1-1-1.htm?page_time=" + page_time;
            name = "Music搜索";
        }
        else if (engine === "video"){
            url = "https://www.bing.com/search?ensearch=1&q=tokyvideo+";
            url = url + _word + "&page_time=" + page_time;
            name = "Bing+Toky搜索";
        }
        else if (engine === "ipdomain"){
            url = "https://ipchaxun.com/";
            url = url + _word;
            name = "IP&网址";
        }
        else if (engine === "whois"){
            url = "https://www.whois.com/whois/";
            url = url + _word;
            name = "域名Whois";
        }
        else if (engine === "dpxz_download"){
            url = "http://s.uzzf.com/sousuo/pc/?k=";
            url = url + _word;
            name = "东坡下载";
        }
        else if (engine === "github"){
            let url = "https://github.com/search?&type=Repositories";
            url = url + "&q=" + _word + "&page_time=" + page_time;
            name = "Github";
        }
        else if (engine === "zh_en"){
            url = "https://fanyi.baidu.com/translate#zh/en/";
            url = url + _word + "&page_time=" + page_time;
            name = "中英翻译";
        }
        else if (engine === "en_zh"){
            let url = "https://fanyi.baidu.com/translate#en/zh/";
            url = url + _word + "&page_time=" + page_time;
            name = "英中翻译";
        }
        else {
            view.alert_txt("engine参数为空，不能选择跳转的目标地址");
            view.log("/?route=search&engine=&word=");
            return;
        }

        view.title("Opening keywords" + " with " + name);

    }

    window.location.replace(url);
}

function s_update_history(input_value){
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
        view.log("input_value不能为空");
    }

    // 自动处理历史记录，规则：start_history - new_history > 60 day，即表示无法在”长时间连续使用“的情况下，以前的历史即为fake历。
    let len_day = 2*30; // 默认存2个月
    let input_history_start_time_key = "input_history_start_time";
    let input_history_new_time_key = "input_history_new_time";
    let input_history_start_time = view.get_data(input_history_start_time_key)*1;
    let input_history_new_time = view.get_data(input_history_new_time_key)*1;
    let input_history_len_time = len_day * 24 * 60 * 60; // 间隔时间，s
    // 初始值
    if (!input_history_start_time || input_history_start_time<0){
        input_history_start_time = view.time_s()*1;
    }
    if (!input_history_new_time || input_history_new_time<0){
        input_history_new_time = view.time_s()*1;
    }
    // 判断连续时间
    if (input_history_new_time - input_history_start_time >= input_history_len_time){ // 不连续，重新计算时间
        s_clear_history();
    }else{ // 连续，更新最新的时间，即连续使用时，数据都为有效数据。
        view.set_data(input_history_start_time_key, input_history_new_time);
    }
}

function s_clear_history(){
    let input_history_start_time_key = "input_history_start_time";
    let input_history_new_time = view.time_s()*1;
    view.set_data(input_history_start_time_key, input_history_new_time);

    let data_key = "input_history";
    return view.del_data(data_key);
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
    s_update_history(word); // 更新历史

    if (!engine){
        let search_eq = view.get_data("search__eq");
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

function show_page(){
    window.location.reload();
}
