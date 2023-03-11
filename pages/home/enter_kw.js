// 输入kw@关键词时对应
function enter_kw(_word){
    let word = decodeURIComponent(_word);
    view.log([_word, word]);
    let state = true;
    let url = "";
    if (word === "kw@首页" || word === "kw@home" || word === "kw@"){
        url = "./";
        window.open(url, "_blank");
    }
    else if (word === "kw@404"){
        url = "./?route=404";
        window.open(url, "_blank");
    }
    else if (word === "kw@help"){
        url = "./?route=help";
        window.open(url, "_blank");
    }
    else if (word === "kw@chatgpt" || word === "kw@chat" || word === "chat"){
        url = "./?route=chatgpt";
        window.open(url, "_blank");
    }
    else if (word === "kw@clear_cache_file"){
        view.notice_txt("已清除文件缓存", 3000);
        for (let d=0;d<js_src_array.length;d++){
            view.del_data(index_prefix+"js_"+d);
        }
        view.del_data(index_prefix+"js_depend");
    }
    else if (word === "kw@show"){
        view.notice_txt("已打开隐藏的标签列表", 3000);
        $(".swiper-container").removeClass("hide");
    }
    else if (word === "kw@hide"){
        view.notice_txt("已隐藏标签列表", 3000);
        $(".swiper-container").addClass("hide");
    }

    else { // 未匹配
        state = false;
    }
    return state;
}