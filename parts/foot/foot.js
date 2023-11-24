

function start_foot() { // 推荐组件里面的函数写在闭包里面

    let part = {
        "part_init": function (e) {
            view.log(e);
            $(".email-a").html(app_email);
            let s_height = screen.height - 300;
            $(".page-content").css({"min-height":s_height+"px"});

        },

    };

    // $(".foot-content").remove(); // 避免重复写入
    // 写入组件
    view.write_html(cdn_page_file + "parts/foot/foot.view", "route-page", function () {
        part.part_init("foot");
    });
    view.write_css([cdn_page_file + "parts/foot/foot.css"], function () {
        view.log("css");
    });

}

