


function c2() {
    view.log("c2");
}

function asyc() {

    // 单个同步写法
    new Promise(function (resolve, reject) {
        setTimeout(function () {
            view.log("==1-0");
            // resolve("that-test");
            reject("that-reject");
        }, 2000);
    }).then(
        function (value) { // resolve时执行
            view.log("==2-1");
            view.log(value);
        },
        function (error) { // reject时执行
            view.log("==2-2");
            view.log(error);
        }
    ).catch(function (except) { // 异常捕捉
        view.log(except)
    });

    // 多个同步
    // 执行完成后再执行结果
    let p1 = new Promise((resolve,reject)=>{
        let time = Math.random()*4000+1000;
        setTimeout(()=>{
            console.log('p1完成');
            resolve();
        }, time)
    });
    let p2 = new Promise((resolve,reject)=>{
        let time = Math.random()*4000+1000;
        setTimeout(()=>{
            console.log('p2完成');
            resolve();
        }, time)
    });
    let p = Promise.all([p1, p2]);
    p.then(()=>{
        console.log("全部执行完毕");
    });



}



function cal2() {
    view.alert_txt("3", "long");
    view.alert_txt("2", 6000);
    view.alert_txt("1", 3000);

    view.log([16**1/2, 16**(1/2)]);

}


function cal() {

    let res = 3**2;

    view.log(res);

}




function start_this_page() {
    view.log("主框架解析完成，开始渲染模块页面 > >");

    cal();
    cal2();
    asyc();

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
