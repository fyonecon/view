/*可以定义一些组件成功载入完成后的一些【个性化东西】*/

// 初始化页面所有路由文件后，负责框架事件
function frame_loaded(e, route){
    // 页面载入完成，隐藏加载动画
    view.hide_loading();

    // 组件加载时间
    console.info("框架解析用时：" + (time_loaded - time_start) + "ms。", "总耗时还需要+第一个document耗时。");
    view.log("框架报错时间：" + time_error);

    // 监听页面尺寸改变
    window.onresize = function (){
        let width = window.innerWidth;
        //
    };

    // 监听滚动条
    let before_scroll = 0;
    window.onscroll = function() {
        let scroll = document.documentElement.scrollTop || document.body.scrollTop;
        let direct = scroll-before_scroll; // 滚动条滚动距离
        if (direct > 5 && direct < 80){ // 向下滚动
            //
        }else if (direct < -5 && direct > -80){ // 向上滚动
            //
        }else {
            //
        }
        before_scroll = scroll;
    }

    // 监听页面应用进入后台
    document.addEventListener("visibilitychange",function(){
        // 进入前台（已经在前台不触发，仅在有动作后触发））
        if(document.visibilityState === "visible"){
            view.log("切换到前台："+view.time_date("YmdHis"));
            try {show_page(["可选初始切换到前台函数"]);}catch (e){view.log("show_page()：可忽略的可选初始切换到前台函数");}
        }
        // 进入后台
        if(document.visibilityState === "hidden"){
            view.log("切换到后台："+view.time_date("YmdHis"));
            try {hide_page(["可选初始切换到后台函数"]);}catch (e){view.log("hide_page()：可忽略的可选初始切换到后台函数");}
        }
    });

    // 监听切换主题色
    let scheme = window.matchMedia('(prefers-color-scheme: light)');
    scheme.addEventListener('change', (event) => { // if (event.matches){}。// 监听主题色，切换浏览器主题色时会触发此函数
        console.log("切换到主题色：", view.scheme_model());
        try {
            page_color(view.scheme_model());
        }catch (e){
            view.log("无对接主题色page_color(color_model)函数，可忽略，2。");
        }
    });

    // 自动清除缓存
    auto_clear_cache_files();
    // 主动缓存文件
    setTimeout(function (){
        make_cache_files();
    }, 2000);

    // 渲染nav、foot、left
    //
    // let nav_black_route = ["search"];
    // if (nav_black_route.includes(route)) {
    //     // 不加载
    // }else { // 有就加载
    //     view.write_js([
    //         cdn_page_file+"parts/nav/nav.js",
    //     ], function (){
    //         start_nav();
    //     });
    // }
    // //
    // let foot_black_route = ["", "search"];
    // if (foot_black_route.includes(route)) {
    //     // 不加载
    // }else { // 有就加载
    //     view.write_js([
    //         cdn_page_file+"parts/foot/foot.js",
    //     ], function (){
    //         start_foot();
    //     });
    // }

}

// 初始化page页面的开始函数，负责page事件
function page_init(e, route){
    // 处理非法节点，建议只在页面启动后运行一次，不建议多次运行。
    view.pure_page_extensions();
    // 处理登录
    if(!navigator.webdriver){
        // 检查是否由admin_token
        login_token = view.get_data("login_token");
        login_id = view.get_data("login_id")*1;
        login_level = view.get_data("login_level")*1;
        login_name = view.get_data("login_name");
        login_nickname = view.get_data("login_nickname");
        //
        if (route === "login" || route === "404"|| route === "home_help" || route === "help"  || route === "search" || route === "" || route === "home"){ // 白名单
            start_page(e);
        } else { // 不是login的话就直接检查是否已经登录
            // 处理是否过期
            let login_time = view.get_data("login_time");
            let now_time = view.time_s();
            if (!login_time){
                view.set_data("login_time", now_time);
            }
            let timeout = now_time - login_time;

            if (login_token && login_id && login_level && timeout<login_timeout){
                check_admin_token(e, route);
            }else {
                must_login("请先登录");
            }
        }
    }else {
        view.alert_txt("请不要使用模拟浏览器操作页面信息！", "long", "clear");
    }

}
