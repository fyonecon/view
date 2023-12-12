let kwword = "";

// 搜索条件
function jump_location(engine, word) {
    let cache = view.time_date("YmdWHi00");
    let tab_url = '';

    // 1-匹配到外部链接
    if (view.string_include_string(word, "kws")!==-1){
        view.show_loading(0);
        kwword = word;
        view.notice_txt("正在打开kws对应的内容", 2000);
        view.write_js(
            [cdn_page_file+".cache/js/kws.js?cache="+view.time_date("YmdHWi")], function (bool){
                try{
                    kws.load(kwword);
                }catch (w){
                    view.notice_txt("外部js资源加载错误！", 10000);
                    view.title("外部js源加载错误！");
                }
                kwword="";
            });
    }
    // 2-匹配搜索引擎
    else {
        view.show_loading(0);

        let del_fake_news = " "
        del_fake_news = encodeURIComponent(del_fake_news)
        let name = "";

        if (engine === "baidu"){
            let url = "https://www.baidu.com/s?ie=utf-8";
            tab_url = url + "&wd=" + word + del_fake_news + "&cache=" + cache;
            name = "Baidu";
        }
        else if (engine === "bing"){
            let url = "https://www.bing.com/?ensearch=1";
            tab_url = url + "&q=" + word + "&cache=" + cache;
            name = "Bing";
        }
        else if (engine === "google"){
            let url = "https://www.google.com/search?q=";
            tab_url = url + word + "&cache=" + cache;
            name = "Google";
        }
        else if (engine === "duckduckgo"){
            let url = "https://duckduckgo.com/?ia=web";
            tab_url = url + "&q=" + word + "&cache=" + cache;
            name = "DuckDuckGo";
        }
        else if (engine === "github"){
            let url = "https://github.com/search?&type=Repositories";
            tab_url = url + "&q=" + word + "&cache=" + cache;
            name = "Github";
        }
        else if (engine === "yandex"){
            let url = "https://yandex.com/search/?text=";
            tab_url = url+ word + "&cache=" + cache;
            name = "Yandex";
        }
        //
        else if (engine === "icons"){
            let url = "https://cn.youicons.com/search/";
            tab_url = url+ word;
            name = "icon图";
        }

        //
        else if (engine === "m_toutiao"){
            let url = "https://m.toutiao.com/search/?keyword=";
            tab_url = url + word + "&cache=" + cache;
            name = "头条搜索";
        }
        else if (engine === "toutiao"){
            let url = "https://www.toutiao.com/search/?keyword=";
            tab_url = url + word + "&cache=" + cache;
            name = "头条搜索";
        }
        else if (engine === "m_sogou"){
            let url = "https://wap.sogou.com/web/searchList.jsp?from=index&keyword=";
            tab_url = url + word + "&cache=" + cache;
            name = "搜狗搜索";
        }
        else if (engine === "sogou"){
            let url = "https://sogou.com/web?query=";
            tab_url = url + word + "&cache=" + cache;
            name = "搜狗搜索";
        }
        else if (engine === "weixin"){
            let url = "https://weixin.sogou.com/weixin?type=2&s_from=input&ie=utf8&query=";
            tab_url = url + word + "&cache=" + cache;
            name = "微信文章搜索";
        }
        else if (engine === "music"){
            let url = "https://www.hifini.com/search-";
            tab_url = url + word + "-1-1-1.htm?cache=" + cache;
            name = "Music搜索";
        }
        else if (engine === "video"){
            let url = "https://www.bing.com/search?ensearch=1&q=tokyvideo+";
            tab_url = url + word + "&cache=" + cache;
            name = "Bing+Toky搜索";
        }
        else if (engine === "ipdomain"){
            let url = "https://ipchaxun.com/";
            tab_url = url + word;
            name = "IP&网址";
        }
        else if (engine === "whois"){
            let url = "https://www.whois.com/whois/";
            tab_url = url + word;
            name = "域名Whois";
        }
        else if (engine === "dpxz_download"){
            let url = "http://s.uzzf.com/sousuo/pc/?k=";
            tab_url = url + word;
            name = "东坡下载";
        }
        else if (engine === "zh_en"){
            let url = "https://fanyi.baidu.com/translate#zh/en/";
            tab_url = url + word + "&cache=" + cache;
            name = "中英翻译";
        }
        else if (engine === "en_zh"){
            let url = "https://fanyi.baidu.com/translate#en/zh/";
            tab_url = url + word + "&cache=" + cache;
            name = "英中翻译";
        }
        else {
            view.alert_txt("engine参数不能完成匹配，不能选择跳转的目标地址");
            return;
        }
        // 根据不同路由选择不同的打开新标签方式
        if (view.get_route() === "search"){
            view.title("Opening keywords" + " with " + name);
            window.location.replace(tab_url);
        }else{
            view.window_open(tab_url, "_blank");
        }
    }

}

// 开始搜索
function jump_to_search_engine(engine, word) {
    if (!engine){ // 初始值
        let search_eq = view.get_data("search__eq");
        search_eq = 1*search_eq;
        if (search_eq === 0){
            engine = "bing";
        }
        else if (search_eq === 1){
            engine = "baidu";
        }
        else if (search_eq === 2){
            engine = "google";
        }
        else if (search_eq === 3){
            engine = "duckduckgo";
        }
        else {
            engine = "bing";
        }
    }
    view.log([word, engine, search_eq]);
    jump_location(engine, word);
}