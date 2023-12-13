

$(document).on("click", ".trans-txt", function (){
    let that = $(this);
    let text_value1 = $("#textarea-1").val();
    $("#textarea-2").html("");
    $("#textarea-2").html(view.filter_xss(text_value1));
})

$(document).on("click", ".trans-pure_txt", function (){
    let that = $(this);
    let text_value1 = $("#textarea-1").val();
    $("#textarea-2").html("");
    $("#textarea-2").html(view.filter_xss(text_value1));
    text_value1 = $("#textarea-2").text()
    $("#textarea-2").html(text_value1);
})


// 组件起始函数
function run_parts(text, data){
    //
    $("#textarea-2").html('<div style="opacity: 0.5;">空结果</div>');

}