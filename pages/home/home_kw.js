// 输入kw@关键词时对应
function home_kw(_word){
    let word = decodeURIComponent(_word);
    view.log([_word, word]);
    let state = true;
    let url = "";
    if (word === "kw@首页" || word === "kw@home" || word === "kw@" || word === "kw@fresh"){
        url = "./";
        window.open(url, "_self");
    }
    else if (word === "kw@login"){
        url = "./?route=login";
        window.open(url, "_self");
    }
    else if (word === "kw@help"){
        url = "./?route=home_help";
        window.open(url, "_self");
    }
    else if (word === "kw@test"){
        url = "./?route=test";
        window.open(url, "_self");
    }
    else if (word === "kw@404"){
        url = "./?route=404";
        window.open(url, "_self");
    }
    else if (word === "kw@chatgpt" || word === "kw@chat" || word === "chat" || word === "poe"){
        url = "https://poe.com";
        window.open(url, "_blank");
    }
    else if (word === "kw@bing"){
        url = "./?route=search&word="+_word;
        window.open(url, "_self");
    }
    else if (word === "kw@baidu"){
        url = "./?route=search&word="+_word;
        window.open(url, "_self");
    }
    else if (word === "kw@google"){
        url = "./?route=search&word="+_word;
        window.open(url, "_self");
    }
    else if (word === "kw@clear_cache"){
        view.notice_txt("已清除部分文件缓存", 2000);
        clear_cache_files();
    }
    else if (word === "kw@clear_all_cache"){
        view.notice_txt("已清除全部文件缓存", 2000);
        view.clear_data();
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

    else { // 未匹配
        state = false;
    }
    return state;
}