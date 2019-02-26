









function start_this_page() {
    view.log("主框架解析完成，开始渲染模块页面 > >");


    // 测试map缓存
    view.log(view.set_cache("test", "cache-value"));
    view.log(view.get_cache("test"));

    // md5测试
    view.log(view.md5("test"));

    // base64_encode
    view.log(view.base64_encode("test"));
    view.log(view.base64_decode(view.base64_encode("test")));

    // cookie
    view.set_cookie("test", "cookie-cache", 7*24*60*60*1000);

}