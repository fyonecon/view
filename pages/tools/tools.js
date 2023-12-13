
let selected_write_js = "";
let selected_confirm = ""; // must 表示要确认才能切换，其他值为随意切换
let selected_that;
$(document).on("click", ".a-write_js", function (){
    let that = $(this);

    // 获取文件
    let confirm = that.attr("data-confirm");
    let js_url = that.attr("data-write_js");
    let _js_url = cdn_page_file+js_url+"?cache="+view.time_date("YmdHis");
    let css_url = that.attr("data-write_css");
    let _css_url = cdn_page_file+css_url+"?cache="+view.time_date("YmdHis");
    let html_url = that.attr("data-write_html");
    let _html_url = cdn_page_file+html_url+"?cache="+view.time_date("YmdHis");

    // 渲染点击选中
    that.siblings("div").removeClass("tools-left-item-active");
    that.addClass("tools-left-item-active");

    // 写入目标模块
    function insert_html(insert_class_name){
        view.write_css([_css_url]);
        view.write_js([_js_url], function (state){
            if (state){
                $("#tools-right-content").html(""); // 每次正确运行时就初始化dom
                view.write_html(_html_url, "tools-right-content", function (_state){
                    if (_state){
                        run_parts(that.text(), [_js_url, _css_url, _html_url]);
                    }else{
                        view.alert_txt("js_html加载失败！", 3000);
                    }
                }, insert_class_name);
            }else{
                view.alert_txt("js_url加载失败！", 3000);
            }
        });
    }

    // 跳过重复点击的动作
    if (selected_write_js === js_url){ // 重复
        let insert_class_name = "tab-"+view.md5(js_url);
        view.log("执行一样的item", [that.text(), selected_write_js, js_url]);
        // view.notice_txt("当前工具就是目标工具", 2000);
        // 判断是否能直接切换新的item
        if (selected_confirm === "must" || selected_confirm === "true"){ // 不可以直接切换
            view.alert_confirm("⚠️ 内容可能丢失", "是否重置「"+that.text()+"」 ？", function (state){
                if (!state){
                    // view.notice_txt("取消了重置", 2000);
                }else{ // 确认切换
                    // view.notice_txt("已重置", 2000);
                    //
                    insert_html(insert_class_name);
                }
            });
        }else{ // 可以直接切换
            // view.notice_txt("已重置「"+that.text()+"」", 2000);
            //
            insert_html(insert_class_name)
        }
    }else{ // 不重复
        let insert_class_name = "tab-"+view.md5(js_url);
        // 判断是否能直接切换新的item
        if (selected_confirm === "must" || selected_confirm === "true"){ // 不可以直接切换
            view.alert_confirm("⚠️ 内容可能丢失", "是否切换到「"+that.text()+"」 ？", function (state){
                if (!state){
                    // view.notice_txt("取消了切换", 2000);
                    // 返回选中
                    selected_that.siblings("div").removeClass("tools-left-item-active");
                    selected_that.addClass("tools-left-item-active");
                }else{ // 确认切换
                    // view.notice_txt("已切换", 2000);
                    // 新值
                    selected_write_js = js_url;
                    selected_confirm = confirm;
                    selected_that = that;
                    //
                    insert_html(insert_class_name);
                }
            });
        }else{ // 可以直接切换
            // 新值
            selected_write_js = js_url;
            selected_confirm = confirm;
            selected_that = that;
            //
            insert_html(insert_class_name)
        }
    }
});

function start_page(){
    $(".back-div").removeClass("hide");

    // 默认点击第一个
    // $(".a-write_js").eq(0).click();

}

//
function show_page(){

}

//
function hide_page(){

}
