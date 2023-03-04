

(function () { // 推荐组件里面的函数写在闭包里面

    let part = {
        "part_init": function (e) {
            view.log(e);
        },

    };

    // 写入组件
    view.write_htm(cdn_page_file + "parts/foot/foot.html", "depend", function () {
        part.part_init("foot");
    });
    view.write_css([cdn_page_file + "parts/foot/foot.css"], function () {
        view.log("css");
    });

})();

