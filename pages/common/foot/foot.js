
// 注射文件
(function () {

    const file_path = page_url + "pages/common/foot/foot.htm";

    view.write_htm(file_path, "depend", run_foot);

})();

function run_foot(e) {
    view.log("foot渲染完成。");

}
