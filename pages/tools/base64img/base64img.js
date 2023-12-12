
// 页面起始函数
function run_tools_content(text, data){

    // 监听文件上传
    let elem = document.getElementById("input-file");
    elem.addEventListener("change", () => {
        console.log(elem.files);
        view.show_loading("long");

        let file = elem.files[0];
        let filename = file.name;
        let filesize = (file.size/1024).toFixed(2); // KB
        let type = file.type;

        $(".input-file-info").html('文件信息：<span class="input-file-info-span">'+filename+'，</span><span class="input-file-info-span">'+filesize+'KB，</span><span class="input-file-info-span">'+type+'</span>');

        let reader=new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e) {
            let base64_img = this.result;

            if (base64_img.indexOf("data:image/") === -1){ // 无
                view.notice_txt("未知格式的图片", 3000);
                base64_img = "未知格式的图片：\n"+base64_img;
            }
            $(".input-file-img").attr("src", base64_img);
            $(".input-file-img").attr("alt", filename);
            $("#textarea-2").val(base64_img);
            view.hide_loading();
        };
        reader.onerror = function (){
            view.notice_txt("文件流载入失败", 2000);
            view.hide_loading();
        };
    });

}