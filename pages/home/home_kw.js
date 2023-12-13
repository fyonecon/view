// 输入kw@关键词时对应
function check_input_kw(_word){
    let word = decodeURIComponent(_word);
    view.log("对比字符串：", [_word, word]);
    let state = true;
    let url = "";
    if (word === "kw@首页" || word === "kw@home" || word === "kw@" || word === "kw@fresh" || word === "kw@refresh"){
        url = "./";
        view.window_open(url, "_self");
    }
    else if (word === "kw@login"){
        url = "./?route=login";
        view.window_open(url, "_self");
    }
    // else if (word === "kw@help"){
    //     url = "./?route=home-help";
    //     view.window_open(url, "_self");
    // }
    else if (word === "kw@404"){
        url = "./?route=404";
        view.window_open(url, "_self");
    }
    else if (word === "kw@bing"){
        url = "./?route=search&word="+_word;
        view.window_open(url, "_self");
    }
    else if (word === "kw@baidu"){
        url = "./?route=search&word="+_word;
        view.window_open(url, "_self");
    }
    else if (word === "kw@google"){
        url = "./?route=search&word="+_word;
        view.window_open(url, "_self");
    }
    else if (word === "kw@note"){
        url = "./?route=note&cache="+view.time_date("YmdHis");
        view.window_open(url, "_self");
    }

    else if (word === "kw@clear_all_data"){
        clear_all_data();
    }
    else if (word === "kw@show"){
        view.notice_txt("已打开隐藏的标签列表", 2000);
        $(".swiper-container").removeClass("hide");
        view.set_data("swiper_container_show", "show");
    }
    else if (word === "kw@hide"){
        view.notice_txt("已隐藏标签列表", 2000);
        $(".swiper-container").addClass("hide");
        view.set_data("swiper_container_show", "hide");
    }
    else if (word === "kw@show_color"){
        view.notice_txt("已打开主题切换按钮", 2000);
        $(".change-color-div").removeClass("hide");
    }
    else if (word === "kw@hide_color"){
        view.notice_txt("已隐藏主题切换按钮", 2000);
        $(".swiper-container").removeClass("hide");
    }
    else if (word === "kw@show_on_hour"){
        view.notice_txt("已打开整点报时切换按钮", 2000);
        $(".on-hour-div").removeClass("hide");
    }
    else if (word === "kw@hide_on_hour"){
        view.notice_txt("已隐藏整点报时切换按钮", 2000);
        $(".on-hour-div").removeClass("hide");
    }
    else if (word === "kw@tools"){
        view.notice_txt("已展示Tools按钮", 2000);
        $(".tools-span").removeClass("hide");
    }
    else if (view.string_include_string(word, "kw@url=") >= 0){
        view.notice_txt("打开网址", 2000);
        let dom_id = "content-bg";
        let url = word.replace("kw@url=", "");
        // 初始化
        view.del_xss_iframe(dom_id);
        $("#"+dom_id).css({"z-index": 80});
        // 重新渲染
        view.xss_iframe(dom_id, url, function (url){
            $("#"+dom_id).css({"z-index": 120});
        });
        return true;
    }

    else { // 未匹配
        state = false;
    }
    return state;
}