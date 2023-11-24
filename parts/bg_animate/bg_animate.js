
(function () { // 推荐组件里面的函数写在闭包里面

    let part = {
        "part_init": function (e) {
            view.log(e);
        },

    };


    // 写入组件
    view.write_css([cdn_page_file + "parts/bg_animate/bg_animate.css"])
    view.write_html(cdn_page_file + "parts/bg_animate/bg_animate.view", "depend");

})();
