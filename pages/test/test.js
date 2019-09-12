









function start_this_page(info) {
    view.log(info);


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

    // get
    view.get("http://localhost/liangjian/public/?s=/find_alive", function (e) {
        view.log(e[2]);
    }, "get===");

}
