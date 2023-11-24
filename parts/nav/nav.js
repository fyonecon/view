

function start_nav() { // 推荐组件里面的函数写在闭包里面

    let part = {
        "part_init": function (e) {
            view.log(e);
            // 渲染选中
            let active_div = view.get_url_param("", "route");
            if (!active_div){
                active_div = "home";
            }
            else if (active_div === "cat"){
                active_div = view.get_url_param("", "cat");
            }
            $(".tab-item-" + active_div).addClass("active-item");

            //
            // view.title($(".tab-item-" + active_div).text() + " - " + app_name);

            //
            // view.load_img("nav-app-logo", cdn_page_file+"static/img/");
            // view.set_txt_logo("nav-title-div", "二三搜", "23so.net"); // 渲染标题
            // 显示登录信息
            if (login_id && login_token){
                $(".tab-item-notes").removeClass("hide");
                $(".tab-item-mine").removeClass("hide");
                $(".tab-item-mine").html( "🐞"+login_nickname);
            }

        },

    };

    // $(".nav-content").remove(); // 避免重复写入
    // 写入组件
    view.write_html(cdn_page_file + "parts/nav/nav.view", "route-page", function () {
        part.part_init("nav");
    });
    view.write_css([cdn_page_file + "parts/nav/nav.css"], function () {
        view.log("css");
    });

}

