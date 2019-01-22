



function run_foot() {
   console_log("foot渲染完成。");

}


(function () {

    const file_path = "file/common/foot/foot.htm";

    $.ajax({ // 利用ajax的get请求获取文本内容
        url: file_path,
        async: true,
        success: function (data) {
            let div = document.createElement("div");
            div.innerHTML = data;
            document.getElementById("depend").appendChild(div); // 将模块渲染入主文件

            run_foot();
        },
        error: function (error) {
            console.log("缺失模块html-foot文件=" + error);
        }
    });

})();