/*可以定义一些组件成功载入完成后的一些【个性化东西】*/

// 直接清除缓存
function clear_cache_files(){
    view.log("直接清除特定缓存");
    // depend
    for (let d=0;d<depend_js_array.length;d++){
        // let file = depend_js_array[d];
        let key = index_prefix+"js_depend_"+d; // 首页无md5
        view.del_data(key);
    }
    // depend
    view.del_data(index_prefix+"js_depend");
    // load
    for (let d=0;d<depend_load_file.js.length;d++){
        let file = depend_load_file.js[d];
        let key = index_prefix+"js_load_"+view.md5(file);
        view.del_data(key);
    }
    // public
    for (let d=0;d<page_public_file.js.length;d++){
        let file = page_public_file.js[d];
        let key = index_prefix+"js_public_"+view.md5(file);
        view.del_data(key);
    }

    // page 清除所有路由下的文件缓存
    // for (let d=0;d<route_page_file.js.length;d++){ // 当前路由page的文件
    //     let file = route_page_file.js[d];
    //     let key = index_prefix+"js_page_"+view.md5(file);
    //     view.del_data(key);
    // }
    for (let r=0;r<pages.length;r++){ // 循环路由
        let route_file = pages[r];
        let route_js = route_file.file[0].js;
        for (let d=0;d<route_js.length;d++){ // 单个page的文件
            let file = route_js[d];
            let key = index_prefix+"js_page_"+view.md5(file);
            view.del_data(key);
        }
    }

}

// 自动清除缓存
function auto_clear_cache_files(){
    let old_cache_version = view.get_cookie("cache_version");
    if (old_cache_version !== cache_version){
        console.log("缓存版本不匹配，自动清空老缓存。");
        clear_cache_files();
        let time = 6*30*24*60*60*1000;
        view.set_cookie("cache_version", cache_version, time);
    }else {
        // depend
        let cache_depend_file_key = index_prefix+"cache_depend_file_state";
        let cache_depend_file_time = 3*30*24*60*60*1000; // 文件缓存的过期时间
        let cache_depend_file_state = view.get_cookie(cache_depend_file_key);
        if (!cache_depend_file_state){ // 没有就全部清除cache_file
            view.log("清除所有前缀cache_depend_file");
            view.set_cookie(cache_depend_file_key, "Has", cache_depend_file_time);
            for (let d=0;d<depend_js_array.length;d++){
                // let file = depend_js_array[d];
                let key = index_prefix+"js_depend_"+d; // 首页无md5
                view.del_data(key);
            }
            view.del_data(index_prefix+"js_depend"); //
        }
        // load
        let cache_load_file_key = index_prefix+"cache_load_file_state";
        let cache_load_file_time = 3*30*24*60*60*1000; // 文件缓存的过期时间
        let cache_load_file_state = view.get_cookie(cache_load_file_key);
        if (!cache_load_file_state){ // 没有就全部清除cache_file
            view.log("清除所有前缀cache_load_file");
            view.set_cookie(cache_load_file_key, "Has", cache_load_file_time);
            for (let d=0;d<depend_load_file.js.length;d++){
                let file = depend_load_file.js[d];
                let key = index_prefix+"js_load_"+view.md5(file);
                view.del_data(key);
            }
        }
        // public
        let cache_public_file_key = index_prefix+"cache_public_file_state";
        let cache_public_file_time = 3*30*24*60*60*1000; // 文件缓存的过期时间
        let cache_public_file_state = view.get_cookie(cache_public_file_key);
        if (!cache_public_file_state){ // 没有就全部清除cache_file
            view.log("清除所有前缀cache_public_file");
            view.set_cookie(cache_public_file_key, "Has", cache_public_file_time);
            for (let d=0;d<page_public_file.js.length;d++){
                let file = page_public_file.js[d];
                let key = index_prefix+"js_public_"+view.md5(file);
                view.del_data(key);
            }
        }
        // page
        let cache_page_file_key = index_prefix+"cache_page_file_state";
        let cache_page_file_time = 3*30*24*60*60*1000; // 文件缓存的过期时间
        let cache_page_file_state = view.get_cookie(cache_page_file_key);
        if (!cache_page_file_state){ // 没有就全部清除cache_file
            view.log("清除所有前缀cache_page_file");
            view.set_cookie(cache_page_file_key, "Has", cache_page_file_time);
            // for (let d=0;d<route_page_file.js.length;d++){ // 当前路由page下的缓存文件
            //     let file = route_page_file.js[d];
            //     let key = index_prefix+"js_page_"+view.md5(file);
            //     view.del_data(key);
            // }
            for (let r=0;r<pages.length;r++){ // 循环路由
                let route_file = pages[r];
                let route_js = route_file.file[0].js;
                for (let d=0;d<route_js.length;d++){ // 单个page的文件
                    let file = route_js[d];
                    let key = index_prefix+"js_page_"+view.md5(file);
                    view.del_data(key);
                }
            }
        }
    }
}

// 主动添加缓存
function make_cache_files(){
    if (cache_state === true){
        console.log("'自动更新缓存'已开启。已有就跳过，没有就重新缓存。");
        // 缓存depend-index-js
        for (let j=0; j<depend_js_array.length; j++){
            let file = depend_js_array[j];
            let key = index_prefix+"js_depend_"+j; // 首页无md5
            view.cache_file(key, file, false);
        }
        // 缓存核心解析depend-index-js
        view.cache_file(index_prefix+"js_depend", cdn_depend_file + "bootstrap/depend.js", false);
        // 缓存depend-load-js
        for (let i=0; i<depend_load_file.js.length; i++){
            let file = depend_load_file.js[i];
            let key = index_prefix+"js_load_"+view.md5(file);
            view.cache_file(key, file, false);
        }
        // 缓存public-js
        for (let i=0; i<page_public_file.js.length; i++){
            let file = page_public_file.js[i];
            let key = index_prefix+"js_public_"+view.md5(file);
            view.cache_file(key, file, false);
        }
        // 缓存page-js
        for (let i=0; i<route_page_file.js.length; i++){ // page文件会重复，必须按文件名区分
            let file = route_page_file.js[i];
            let key = index_prefix+"js_page_"+view.md5(file);
            view.cache_file(key, file, false);
        }
    }else {
        console.log("'自动更新缓存'已关闭，主动清理特定旧缓存。");
        clear_cache_files();
    }
}

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

    // 自动清除缓存
    auto_clear_cache_files();
    // 主动缓存文件
    setTimeout(function (){
        make_cache_files();
    }, 2000);

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
