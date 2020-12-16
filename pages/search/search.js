

function jump_to_search_engine() {
    let page_time = view.get_date()[0] + "_" + view.md5(view.get_date()[1]);
    let engine = "";
    let word = "";
    let url = "";

    engine = view.get_url_param("", "engine");
    try {
        word = view.get_url_param("", "word");
    }catch (e) {
        view.error(["可忽略的错误", e]);
        word = "";
    }

    if (word === "%s" || word === ""){
        view.alert_txt("word参数出问题或搜索内容不能为空", 2000);
        url = "https://www.bing.com/?ensearch=1&q=如何使用搜索";
    }else {
        if (engine === "baidu"){
            url = "https://www.baidu.com/s?ie=utf-8";
            url = url + "&wd=" + decodeURI(word) + "&page_time=" + page_time
            ;
        }else if (engine === "bing"){
            url = "https://www.bing.com/?ensearch=1";
            url = url + "&q=" + decodeURI(word) + "&page_time=" + page_time
            ;
        }
        else if (engine === "google"){
            url = "https://www.google.com/search?q=";
            url = url + decodeURI(word) + "&page_time=" + page_time

            ;
        }
        else if (engine === "music"){
            url = "https://www.hifini.com/search-";
            url = url + decodeURI(word) + "-1-1-1.htm?page_time=" + page_time
            ;
        }

        else {
            view.alert_txt("engine参数为空，不能选择跳转的目标地址");
            view.log("/?route=search&engine=&word=");

            return;
        }

    }

    view.log([engine, word, url]);

    window.location.replace(url);

}

function start_this_page() {
    jump_to_search_engine();

}
