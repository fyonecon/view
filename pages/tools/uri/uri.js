

$(document).on("click", ".trans-uri_encode", function (){
    let that = $(this);
    let text_value1 = $("#textarea-1").val();
    $("#textarea-2").html(encodeURIComponent(text_value1));
})

$(document).on("click", ".trans-uri_decode", function (){
    let that = $(this);
    let text_value1 = $("#textarea-1").val();
    $("#textarea-2").html(decodeURIComponent(text_value1));
})


// 页面起始函数
function run_tools_content(text, data){
    //
    $("#textarea-2").html('<div style="opacity: 0.5;">空结果</div>');

}