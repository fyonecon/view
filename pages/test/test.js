

function test_js(key, js, id){
    cache_js_func(key, "成功调用");
}

function start_page(e){
    console.log(e);
    view.make_cache_js("cache_js", "./pages/test/cache_js.js", true, test_js);
}