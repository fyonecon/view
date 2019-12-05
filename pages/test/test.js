

function run_res(request, test_data, text) {
    view.log([request, test_data, text]);

    let html = request.request_back;

    document.getElementById("text-get").innerHTML = html;

}

function request() {

    view.log(view.date());
    view.log(view.time());

    let map = new Map([
        ["course_comment_id", "all"],
    ]);

    //view.request_get("http://47.111.168.64/cswd/public/index.php/api/app/list_course_comment", map, run_res);
    
    //view.request_post("http://47.111.168.64/cswd/public/index.php/api/app/list_course_comment", map, run_res);

    view.log("==================");

    view.request_get("http://127.0.0.1/play/pages/test/test_get.htm", map, run_res);
    
    
}









function page_data_init(info) { // 此页面模块起始
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
    // view.get("http://localhost/liangjian/public/?s=/find_alive", function (e) {
    //     view.log(e[2]);
    // }, "get===");


    request();


}
