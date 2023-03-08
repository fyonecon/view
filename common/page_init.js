/*可以定义一些组件成功载入完成后的一些【个性化东西】*/

// 初始化页面所有路由文件后，负责框架事件
function frame_loaded(e, route){
    // 页面载入完成，隐藏加载动画
    view.hide_loading();

    // 组件加载时间
    view.log("框架解析用时=" + (time_loaded - time_start) + "ms");
    view.log("框架报错时间=" + time_error);

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
            view.log("切换到前台："+view.get_date()[0]);
            try {show_page(["可选初始切换到前台函数"]);}catch (e){view.log("show_page()：可忽略的可选初始切换到前台函数");}
        }
        // 进入后台
        if(document.visibilityState === "hidden"){
            view.log("切换到后台："+view.get_date()[0]);
            try {hide_page(["可选初始切换到后台函数"]);}catch (e){view.log("hide_page()：可忽略的可选初始切换到后台函数");}
        }
    });

}

// 初始化page页面的开始函数，负责page事件
function page_init(e, route){
    if(!navigator.webdriver){
        if (route === "login" || route === "404" || route === "help" || route === ""){
            start_page(e);
        } else { // 不是login的话就直接检查是否已经登录
            check_admin_token(e, route);
        }
    }else {
        view.alert_txt("请不要使用模拟浏览器操作页面信息！", "long", "clear");
    }

}
